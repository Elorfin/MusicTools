<?php

namespace MusicTools\TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Routing\ClassResourceInterface;

/**
 * Degree CRUD Controller
 */
class DegreeController extends Controller implements ClassResourceInterface
{
    /**
     * List all Degrees
     * "get_degrees"     [GET] /chords
     *
     * @return array
     */
    public function cgetAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('MusicToolsTheoryBundle:Degree')
            ->findBy(array(), array());

        return $entities;
    }
}