<?php

namespace TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;

/**
 * Interval CRUD Controller
 *
 * @Route("/intervals")
 */
class IntervalController extends Controller
{
    /**
     * List all Intervals
     * @return array
     *
     * @Route("")
     * @Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('TheoryBundle:Interval')
            ->findBy(array(), array('value' => 'ASC'));

        return new JsonApiResponse($entities);
    }
}