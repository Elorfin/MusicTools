<?php

namespace UserBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use MusicianBundle\Entity\Musician;
use UserBundle\Entity\User;
use UserBundle\Form\Type\UserType;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Profile controller.
 *
 * @Route("/users")
 */
class UserController extends Controller
{
    /**
     * Lists all Musician entities.
     *
     * @Route("/", name="user")
     * @Method("GET")
     */
    public function indexAction()
    {
        // Get current User logged in session
        $user = $this->container->get('security.token_storage')->getToken()->getUser();

        $entities = $this->container->get('doctrine.orm.entity_manager')->getRepository('UserBundle:User')->findAllExceptMe($user);

        return array (
            'entities' => $entities,
        );
    }

    /**
     * Finds and displays a Musician entity.
     *
     * @Route("/{username}", name="user_show")
     * @Method("GET")
     */
    public function showAction(User $user)
    {
        // Get Musician entity from the User object
        $entity = $this->getMusicianFromUser($user);

        // Check if the showed Musician is the current logged User (to display edit links or not)
        $isCurrentMusician = false;
        $currentUser = $this->container->get('security.token_storage')->getToken()->getUser();
        if ($user->getId() === $currentUser->getId()) {
            $isCurrentMusician = true;
        }

        $repo = $this->container->get('doctrine.orm.entity_manager')->getRepository('UserBundle:User');

        return array (
            'entity'    => $entity,
            'isCurrent' => $isCurrentMusician,
            'counts' => array (
                'songs'   => $repo->countSongs($entity),
                'guitars' => 0,
                'friends' => $repo->countFriends($entity),
            ),
        );
    }

    /**
     * Edits an existing Musician entity.
     *
     * @Route("/{username}", name="user_update")
     * @Method("PUT")
     */
    public function updateAction(Request $request, User $user)
    {
        $editForm = $this->createEditForm($user);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->flush();

            return $this->redirect($this->generateUrl('user_edit', array('username' => $entity->getUsername())));
        }

        return array(
            'entity'    => $entity,
            'edit_form' => $editForm->createView(),
        );
    }
}
