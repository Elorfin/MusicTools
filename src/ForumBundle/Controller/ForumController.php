<?php

namespace ForumBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Forum controller.
 *
 * @Route("/forums")
 */
class ForumController extends Controller
{
    /**
     * Lists all Forum entities.
     *
     * @Route("/", name="forum")
     * @Method("GET")
     */
    public function indexAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')->getRepository('ForumBundle:Forum')->findAll();

        return array (
            'entities' => $entities,
        );
    }

    public function showAction()
    {

    }
}