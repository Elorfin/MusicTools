<?php

namespace GameBundle\Controller;

use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;

/**
 * Game controller.
 *
 * @EXT\Route("/games")
 */
class GameController extends Controller
{
    /**
     * List all games.
     *
     * @return JsonApiResponse
     *
     * @EXT\Route("")
     * @EXT\Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')->getRepository('GameBundle:Game')->findAll();

        return new JsonApiResponse($entities);
    }
}
