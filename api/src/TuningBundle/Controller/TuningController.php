<?php

namespace TuningBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use TuningBundle\Entity\Tuning;

/**
 * Tuning CRUD Controller.
 *
 * @EXT\Route("/tunings")
 */
class TuningController extends Controller
{
    /**
     * List all Tunings.
     *
     * @return JsonApiResponse
     *
     * @EXT\Route("")
     * @EXT\Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container
            ->get('doctrine.orm.entity_manager')
            ->getRepository('TuningBundle:Tuning')
            ->findBy([]);

        return new JsonApiResponse($entities);
    }

    /**
     * Display a Tuning entity.
     *
     * @param Tuning $tuning
     *
     * @return JsonApiResponse
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("GET")
     */
    public function getAction(Tuning $tuning)
    {
        return new JsonApiResponse($tuning);
    }
}
