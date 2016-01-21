<?php

namespace InstrumentBundle\Controller;

use InstrumentBundle\Entity\Instrument;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;

/**
 * Instrument CRUD Controller
 *
 * @Route("/instruments")
 */
class InstrumentController extends Controller
{
    /**
     * List all Instruments
     * @return array
     *
     * @Route("")
     * @Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('InstrumentBundle:Instrument')
            ->findBy(array (), array ('model' => 'ASC'));

        return new JsonApiResponse($entities);
    }

    /**
     * Display an Instrument entity
     * @param  Instrument $instrument
     * @return JsonApiResponse
     *
     * @Route("/{id}")
     * @Method("GET")
     */
    public function getAction(Instrument $instrument)
    {
        return new JsonApiResponse($instrument);
    }

}
