<?php

namespace MusicTools\TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Routing\ClassResourceInterface;

/**
 * Interval CRUD Controller
 */
class IntervalController extends Controller implements ClassResourceInterface
{
    /**
     * List all Intervals
     * "get_intervals"     [GET] /intervals
     *
     * @return array
     */
    public function cgetAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('MusicToolsTheoryBundle:Interval')
            ->findBy(array(), array('value' => 'ASC'));

        return $entities;
    }
}