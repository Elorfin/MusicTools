<?php

namespace MusicTools\TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Routing\ClassResourceInterface;

/**
 * Chord CRUD Controller
 */
class ChordController extends Controller implements ClassResourceInterface
{
    /**
     * List all Chords
     * "get_chords"     [GET] /chords
     *
     * @return array
     */
    public function cgetAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('MusicToolsTheoryBundle:Chord')
            ->findBy(array(), array());

        return $entities;
    }
}