<?php

namespace TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use TheoryBundle\Entity\Scale;

/**
 * Scale CRUD Controller.
 *
 * @EXT\Route("/scales")
 */
class ScaleController extends Controller
{
    /**
     * List all Scales.
     *
     * @return array
     *
     * @EXT\Route("")
     * @EXT\Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('TheoryBundle:Scale')
            ->findBy(array(), array());

        return new JsonApiResponse($entities);
    }

    /**
     * Get a Scale entity.
     *
     * @param Scale $scale
     *
     * @return array
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("GET")
     */
    public function getAction(Scale $scale)
    {
        return new JsonApiResponse($scale);
    }
}
