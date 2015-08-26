<?php

namespace MusicTools\MusicianBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Elorfin\UserBundle\Entity\User;
use MusicTools\MusicianBundle\Entity\Musician;
use MusicTools\MusicianBundle\Form\Type\MusicianType;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Profile controller.
 *
 * @Route("/musician")
 */
class ProfileController extends Controller
{
    /**
     * Lists all Musician entities.
     *
     * @Route("/", name="musician")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsMusicianBundle:Musician')->findAll();

        return array (
            'entities' => $entities,
        );
    }

    /**
     * Finds and displays a Musician entity.
     *
     * @Route("/{username}", name="musician_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction(User $user)
    {
        // Get Musician entity from the User object
        $entity = $this->getMusicianFromUser($user);

        // Check if the showed Musician is the current logged User
        $isCurrentMusician = false;
        $currentUser = $this->container->get('security.token_storage')->getToken()->getUser();
        if ($user->getId() === $currentUser->getId()) {
            $isCurrentMusician = true;
        }

        return array (
            'entity'    => $entity,
            'isCurrent' => $isCurrentMusician,
        );
    }

    /**
     * Displays a form to edit an existing Musician entity.
     *
     * @Route("/{username}/edit", name="musician_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction(User $user)
    {
        // Get Musician entity from the User object
        $entity = $this->getMusicianFromUser($user);

        // Create edit form
        $editForm = $this->createEditForm($entity);

        return array(
            'entity'    => $entity,
            'edit_form' => $editForm->createView(),
        );
    }

    /**
     * Creates a form to edit a User entity.
     *
     * @param Musician $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createEditForm(Musician $entity)
    {
        $form = $this->createForm(new MusicianType(), $entity, array(
            'action' => $this->generateUrl('musician_update', array('username' => $entity->getUsername())),
            'method' => 'PUT',
        ));

        return $form;
    }

    /**
     * Edits an existing Musician entity.
     *
     * @Route("/{username}", name="musician_update")
     * @Method("PUT")
     * @Template("MusicToolsGuitarBundle:Guitar:edit.html.twig")
     */
    public function updateAction(Request $request, User $user)
    {
        // Retrieve musician
        $entity = $this->getMusicianFromUser($user);

        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->flush();

            return $this->redirect($this->generateUrl('musician_edit', array('username' => $entity->getUsername())));
        }

        return array(
            'entity'    => $entity,
            'edit_form' => $editForm->createView(),
        );
    }

    /**
     * Get the Musician entity from the User
     * @param  User $user
     * @return \MusicTools\MusicianBundle\Entity\Musician
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    private function getMusicianFromUser(User $user)
    {
        $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsMusicianBundle:Musician')->findOneByUser(array (
            'user' => $user
        ));

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Musician entity.');
        }

        return $entity;
    }
}
