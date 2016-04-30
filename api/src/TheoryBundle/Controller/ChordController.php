<?php

namespace TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use TheoryBundle\Entity\Chord;

/**
 * Chord CRUD Controller.
 *
 * @Route("/chords")
 */
class ChordController extends Controller
{
    /**
     * List all Chords.
     *
     * @return array
     *
     * @Route("")
     * @Method("GET")
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
     * @Route("/{id}")
     * @Method("GET")
     */
    public function getAction(Chord $chord)
    {
        return new JsonApiResponse($chord);
    }
}
