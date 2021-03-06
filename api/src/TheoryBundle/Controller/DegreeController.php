<?php

namespace TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;

/**
 * Degree CRUD Controller.
 *
 * @EXT\Route("/degrees")
 */
class DegreeController extends Controller
{
    /**
     * List all Degrees.
     *
     * @return array
     *
     * @EXT\Route("")
     * @EXT\Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('TheoryBundle:Degree')
            ->findBy(array(), array());

        return new JsonApiResponse($entities);
    }
}
