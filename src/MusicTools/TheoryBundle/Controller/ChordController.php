<?php

namespace MusicTools\TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;

/**
 * Chord CRUD Controller
 *
 * @Route("/chords")
 */
class ChordController extends Controller
{
    /**
     * List all Chords
     * @return array
     *
     * @Route("")
     * @Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('MusicToolsTheoryBundle:Chord')
            ->findBy(array(), array());

        return new JsonApiResponse($entities);
    }

    /**
     * Display a Chord entity
     * @param $id
     * @return array
     *
     * @Route("/{id}")
     * @Method("GET")
     */
    public function getAction($id)
    {
        $entity = $this->getEntity($id);

        return new JsonApiResponse($entity);
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