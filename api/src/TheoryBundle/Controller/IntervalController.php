<?php

namespace TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;

/**
 * Interval CRUD Controller.
 *
 * @EXT\Route("/intervals")
 */
class IntervalController extends Controller
{
    /**
     * List all Intervals.
     *
     * @return array
     *
     * @EXT\Route("")
     * @EXT\Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('TheoryBundle:Interval')
            ->findBy(array(), array('value' => 'ASC'));

        return new JsonApiResponse($entities);
    }
}
