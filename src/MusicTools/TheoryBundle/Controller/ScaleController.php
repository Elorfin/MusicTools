<?php

namespace MusicTools\TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Routing\ClassResourceInterface;

/**
 * Scale CRUD Controller
 */
class ScaleController extends Controller implements ClassResourceInterface
{
    /**
     * List all Scales
     * "get_scales"     [GET] /chords
     *
     * @return array
     */
    public function cgetAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('MusicToolsTheoryBundle:Scale')
            ->findBy(array(), array());

        return $entities;
    }

    /**
     * Display a Scale entity
     * "get_scale"      [GET] /scales/{id}
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
     * @return \MusicTools\TheoryBundle\Entity\Scale
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    private function getEntity($id)
    {
        $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsTheoryBundle:Scale')->findOneBy( array (
            'id' => $id,
        ));

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Scale entity.');
        }

        return $entity;
    }
}