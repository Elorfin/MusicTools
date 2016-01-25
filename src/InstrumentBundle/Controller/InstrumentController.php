<?php

namespace InstrumentBundle\Controller;

use InstrumentBundle\Entity\Instrument;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use Symfony\Component\HttpFoundation\Request;

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

    /**
     * Create a new Instrument
     * @param Request $request
     * @return array
     *
     * @Route("")
     * @Method("POST")
     */
    public function createAction(Request $request)
    {
        $song = new Instrument();
        $form = $this->createForm(new SongType(), $song, array(
            'method' => 'POST',
        ));

        $form->submit(array( $form->getName() => $request->get('data') ));
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($song);
            $this->container->get('doctrine.orm.entity_manager')->flush();

            return new JsonApiResponse($song, 201);
        }

        $errors = $this->getFormErrors($form);

        return new JsonErrorResponse($errors, 422);
    }
}
