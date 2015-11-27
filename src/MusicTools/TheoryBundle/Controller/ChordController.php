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

    /**
     * Display a Chord entity
     * "get_chord"      [GET] /chords/{id}
     * @param $id
     * @return array
     */
    public function getAction($id)
    {
        $entity = $this->getEntity($id);

        return $entity;
    }

    /**
     * Retrieve a Chord entity
     *
     * @param  integer $id
     * @return \MusicTools\TheoryBundle\Entity\Chord
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    private function getEntity($id)
    {
        $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsTheoryBundle:Chord')->findOneBy( array (
            'id' => $id,
        ));

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Chord entity.');
        }

        return $entity;
    }
}