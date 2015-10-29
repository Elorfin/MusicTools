<?php

namespace MusicTools\GameBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Game controller.
 *
 * @Route("/")
 */
class GameController extends Controller
{
    /**
     * List all games
     * @return array
     *
     * @Route("/", name="game")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsGameBundle:Game')->findAll();

        return array (
            'entities' => $entities,
        );
    }
}