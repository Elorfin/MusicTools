<?php

namespace TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use TheoryBundle\Entity\Chord;

/**
 * Chord CRUD Controller.
 *
 * @EXT\Route("/chords")
 */
class ChordController extends Controller
{
    /**
     * List all Chords.
     *
     * @return array
     *
     * @EXT\Route("")
     * @EXT\Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('TheoryBundle:Chord')
            ->findBy(array(), array());

        return new JsonApiResponse($entities);
    }

    /**
     * Get a Chord entity.
     *
     * @param Chord $chord
     *
     * @return JsonApiResponse
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("GET")
     */
    public function getAction(Chord $chord)
    {
        return new JsonApiResponse($chord);
    }
}
