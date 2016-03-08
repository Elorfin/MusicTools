<?php

namespace InstrumentBundle\Controller;

use InstrumentBundle\Entity\InstrumentType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;

/**
 * Instrument Type CRUD Controller
 *
 * @Route("/instrument_types")
 */
class InstrumentTypeController extends Controller
{
    /**
     * List all Instrument Types
     * @return JsonApiResponse
     *
     * @Route("")
     * @Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container
            ->get('doctrine.orm.entity_manager')
            ->getRepository('InstrumentBundle:InstrumentType')
            ->findBy([], [
                'default' => 'DESC',
                'name'    => 'ASC'
            ]);

        return new JsonApiResponse($entities);
    }

    /**
     * Display an Instrument Type entity
     * @param  InstrumentType $instrumentType
     * @return JsonApiResponse
     *
     * @Route("/{id}")
     * @Method("GET")
     */
    public function getAction(InstrumentType $instrumentType)
    {
        return new JsonApiResponse($instrumentType);
    }
}
