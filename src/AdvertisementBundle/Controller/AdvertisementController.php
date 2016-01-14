<?php

namespace AdvertisementBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Advertisement controller.
 *
 * @Route("/advert")
 */
class AdvertisementController extends Controller
{
    /**
     * Lists all Advertisement entities.
     *
     * @Route("/", name="advertisement")
     * @Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')->getRepository('AdvertisementBundle:Advertisement')->findAll();

        return array (
            'entities' => $entities,
        );
    }

    public function getAction($id)
    {

    }
}
