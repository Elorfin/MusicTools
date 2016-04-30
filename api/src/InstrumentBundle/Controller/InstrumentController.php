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
 * Instrument CRUD Controller.
 *
 * @Route("/instruments")
 */
class InstrumentController extends Controller
{
    /**
     * List all generic Instruments of the platform.
     *
     * @return JsonApiResponse
     *
     * @Route("/generic")
     * @Method("GET")
     */
    public function listGenericAction()
    {
    }

    /**
     * List all Instruments of a User.
     *
     * @return JsonApiResponse
     *
     * @Route("")
     * @Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container
            ->get('doctrine.orm.entity_manager')
            ->getRepository('InstrumentBundle:Instrument')
            ->findBy([], ['model' => 'ASC']);

        return new JsonApiResponse($entities);
    }

    /**
     * Display an Instrument entity.
     *
     * @param Instrument $instrument
     *
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
     * Create a new Instrument.
     *
     * @param Request $request
     *
     * @return JsonApiResponse
     *
     * @Route("")
     * @Method("POST")
     */
    public function createAction(Request $request)
    {
        $instrument = new Instrument();
        $form = $this->createForm(InstrumentType::class, $instrument);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($instrument);
            $this->container->get('doctrine.orm.entity_manager')->flush();

            return new JsonApiResponse($instrument, 201);
        }

        $errors = $this->getFormErrors($form);

        return new JsonErrorResponse($errors, 422);
    }

    /**
     * Edit an Instrument.
     *
     * @param Instrument $instrument
     * @param Request    $request
     *
     * @return array
     *
     * @Route("/{id}")
     * @Method("PUT")
     */
    public function updateAction(Instrument $instrument, Request $request)
    {
        $form = $this->createForm(InstrumentType::class, $instrument, [
            'method' => 'PUT',
        ]);

        $form->handleRequest($request);
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
     * Delete an Instrument.
     *
     * @param Instrument $instrument
     *
     * @return array
     *
     * @Route("/{id}")
     * @Method("DELETE")
     */
    public function deleteAction(Instrument $instrument)
    {
        $this->getDoctrine()->getManager()->remove($instrument);
        $this->getDoctrine()->getManager()->flush();

        return new JsonApiResponse(null, 204);
    }

    /**
     * @param $form
     *
     * @return array
     */
    private function getFormErrors(FormInterface $form)
    {
        $errors = [];
        foreach ($form->getErrors(true, false) as $key => $error) {
            $from = $error->getOrigin();

            $errors[$from->getName()] = $error->getMessage();
        }

        // Get errors from children
        foreach ($form->all() as $child) {
            $childErrors = $this->getFormErrors($child);

            if (!empty($childErrors)) {
                $errors[] = $childErrors;
            }
        }

        return $errors;
    }
}
