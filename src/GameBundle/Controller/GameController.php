<?php

namespace GameBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Game controller.
 *
 * @Route("/games")
 */
class GameController extends Controller
{
    /**
     * List all games
     * @return array
     *
     * @Route("")
     * @Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')->getRepository('GameBundle:Game')->findAll();

        return $entities;
    }
}
