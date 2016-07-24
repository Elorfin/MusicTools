<?php

namespace UserBundle\Controller;

use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use UserBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * User controller.
 *
 * @Route("/users")
 */
class UserController extends Controller
{
    /**
     * Lists all User entities.
     *
     * @return JsonApiResponse
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
     * Finds and displays a User entity.
     *
     * @param User $user
     *
     * @return JsonApiResponse
     *
     * @Route("/{username}", name="user_show")
     * @Method("GET")
     */
    public function showAction(User $user)
    {
        return new JsonApiResponse($user);
    }
}
