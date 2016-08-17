<?php

namespace UserBundle\Controller;

use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use UserBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;

/**
 * User controller.
 *
 * @EXT\Route("/users")
 */
class UserController extends Controller
{
    /**
     * Lists all User entities.
     *
     * @return JsonApiResponse
     *
     * @EXT\Route("/", name="user")
     * @EXT\Method("GET")
     */
    public function indexAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')->getRepository('UserBundle:User')->findAll();

        return new JsonApiResponse($entities);
    }

    /**
     * Finds and displays a User entity.
     *
     * @param User $user
     *
     * @return JsonApiResponse
     *
     * @EXT\Route("/{username}", name="user_show")
     * @EXT\Method("GET")
     */
    public function showAction(User $user)
    {
        return new JsonApiResponse($user);
    }
}
