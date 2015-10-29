<?php

namespace MusicTools\AdvertisementBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Advertisement controller.
 *
 * @Route("/advertisement")
 */
class AdvertisementController extends Controller
{
    /**
     * Lists all Advertisement entities.
     *
     * @Route("/", name="advertisement")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsAdvertisementBundle:Advertisement')->findAll();

        return array (
            'entities' => $entities,
        );
    }

    public function showAction()
    {

    }
}