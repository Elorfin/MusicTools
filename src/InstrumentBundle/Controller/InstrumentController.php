<?php

namespace InstrumentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\FormInterface;

use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use Elorfin\JsonApiBundle\Response\JsonErrorResponse;

use InstrumentBundle\Entity\Instrument;
use InstrumentBundle\Form\Type\InstrumentType;

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
            ->findBy([], ['model' => 'ASC']);

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
        $instrument = new Instrument();
        $form = $this->createForm(new InstrumentType(), $instrument, [
            'method' => 'POST',
        ]);

        $form->submit([ $form->getName() => $request->get('data') ]);
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($instrument);
            $this->container->get('doctrine.orm.entity_manager')->flush();

            return new JsonApiResponse($instrument, 201);
        }

        $errors = $this->getFormErrors($form);

        return new JsonErrorResponse($errors, 422);
    }

    /**
     * Edit an Instrument
     * @param  Instrument $instrument
     * @param  Request $request
     * @return array
     *
     * @Route("/{id}")
     * @Method("PUT")
     */
    public function updateAction(Instrument $instrument, Request $request)
    {
        $form = $this->createForm(new InstrumentType(), $instrument, [
            'method' => 'PUT',
        ]);

        $form->submit([ $form->getName() => $request->get('data') ]);
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($instrument);
            $this->container->get('doctrine.orm.entity_manager')->flush();

            return new JsonApiResponse($instrument);
        }

        $errors = $this->getFormErrors($form);

        return new JsonErrorResponse($errors, 422);
    }

    /**
     * @param $form
     * @return array
     */
    private function getFormErrors(FormInterface $form)
    {
        $errors = [];
        foreach ($form->getErrors() as $key => $error) {
            $errors[$key] = $error->getMessage();
        }

        // Get errors from children
        foreach ($form->all() as $child) {
            if (!$child->isValid()) {
                $errors[$child->getName()] = $this->getFormErrors($child);
            }
        }

        return $errors;
    }
}
