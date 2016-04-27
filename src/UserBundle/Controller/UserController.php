<?php

namespace UserBundle\Controller;

use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use Symfony\Component\HttpFoundation\Request;
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

        return new JsonApiResponse($entities);
    }

    /**
     * Finds and displays a Musician entity.
     *
     * @Route("/{username}", name="user_show")
     * @Method("GET")
     */
    public function showAction(User $user)
    {
        // Check if the showed Musician is the current logged User (to display edit links or not)
        $isCurrentMusician = false;
        $currentUser = $this->container->get('security.token_storage')->getToken()->getUser();
        if ($user->getId() === $currentUser->getId()) {
            $isCurrentMusician = true;
        }

        $repo = $this->container->get('doctrine.orm.entity_manager')->getRepository('UserBundle:User');

        return array(
            'entity'    => $user,
            'isCurrent' => $isCurrentMusician,
            'counts' => array(
                'songs'   => $repo->countSongs($user),
                'guitars' => 0,
                'friends' => $repo->countFriends($user),
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
        // Initialize form
        $form = $this->container->get('form.factory')->create(new UserType(), $user);

        // Process sent data
        $form->handleRequest($request);
        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->flush();
        }

        return array(
            'entity'    => $user,
            'edit_form' => $form->createView(),
        );
    }
}
