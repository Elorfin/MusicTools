<?php

namespace MusicTools\InstrumentBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use MusicTools\InstrumentBundle\Entity\Instrument;

/**
 * Wizard for creating new Instrument
 *
 * @Route("/instrument/new")
 */
class CreateWizardController extends Controller
{
    /**
     * Display step 1 (Choose the Instrument type) Form
     *
     * @Route("/", name="instrument_new")
     * @Method("GET")
     * @Template()
     */
    public function step1Action()
    {
        $entity = new Instrument();
        $form = $this->createStepForm($entity, 1);

        return array (
            'current_step' => 1,
            'form'  => $form->createView(),
            'types' => $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsInstrumentBundle:InstrumentType')->findAll(),
        );
    }

    /**
     * Try to process step 1 (Choose the Instrument type) Form
     *
     * @Route("/", name="instrument_new_process")
     * @Method("POST")
     * @Template("MusicToolsInstrumentBundle:CreateWizard:step1.html.twig")
     */
    public function step1ProcessAction(Request $request)
    {
        $entity = new Instrument();
        $form = $this->createStepForm($entity, 1);

        $form->handleRequest($request);
        if ($form->isValid()) {
            $this->container->get('doctrine.orm.entity_manager')->persist($entity);

            // Form is valid, go to the next step
            return $this->forward('MusicToolsInstrumentBundle:CreateWizard:step2', array(
                'entity'  => $entity,
            ));
        }

        // Invalid form, display again with errors
        return array (
            'current_step' => 1,
            'form'  => $form->createView(),
            'types' => $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsInstrumentBundle:InstrumentType')->findAll(),
        );
    }

    /**
     * Step 2 - Choose a model
     *
     * @Route("/step_2", name="instrument_new_step2")
     * @Method("GET")
     * @Template()
     */
    public function step2Action(Instrument $entity)
    {
        $form = $this->createStepForm($entity, 2);

        return array (
            'current_step' => 2,
            'form'  => $form->createView(),
        );
    }

    /**
     * @param Instrument $entity
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return array
     *
     * @Route("/step_2", name="instrument_new_step2_process")
     * @Method("POST")
     * @Template("MusicToolsInstrumentBundle:CreateWizard:step2.html.twig")
     */
    public function step2ProcessAction(Instrument $entity, Request $request)
    {
        $form = $this->createStepForm($entity, 2);

        $form->handleRequest($request);
        if ($form->isValid()) {
            $this->container->get('doctrine.orm.entity_manager')->persist($entity);

            // Form is valid, go to the next step
            return $this->forward('MusicToolsInstrumentBundle:CreateWizard:step3', array(
                'entity'  => $entity,
            ));
        }

        // Invalid form, display again with errors
        return array (
            'current_step' => 2,
            'form' => $form->createView(),
        );
    }

    /**
     * Step 3 - Fill information
     *
     * @Route("/step_3", name="instrument_new_step3")
     * @Method("GET")
     * @Template()
     */
    public function step3Action(Instrument $entity)
    {
        $form = $this->createStepForm($entity, 3);

        return array (
            'current_step' => 3,
            'form'  => $form->createView(),
        );
    }

    /**
     * @param Instrument $entity
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return array
     *
     * @Route("/step_3", name="instrument_new_step3_process")
     * @Method("POST")
     * @Template("MusicToolsInstrumentBundle:CreateWizard:step3.html.twig")
     */
    public function step3ProcessAction(Instrument $entity, Request $request)
    {
        $form = $this->createStepForm($entity, 3);

        $form->handleRequest($request);
        if ($form->isValid()) {
            $this->container->get('doctrine.orm.entity_manager')->persist($entity);
            $this->container->get('doctrine.orm.entity_manager')->flush();

            return $this->redirect($this->generateUrl('instrument_show', array('id' => $entity->getId())));
        }

        // Invalid form, display again with errors
        return array (
            'current_step' => 2,
            'form' => $form->createView(),
        );
    }

    /**
     * Generate correct Form object for a step of the Wizard
     * @param  Instrument $entity The entity
     * @param  integer    $stepNumber
     * @return \Symfony\Component\Form\Form The form
     */
    private function createStepForm(Instrument $entity, $stepNumber)
    {
        $formType = '\\MusicTools\InstrumentBundle\\Form\\Type\\CreateWizard\\Step' . $stepNumber . 'Type';

        if (1 !== $stepNumber) {
            $action = 'instrument_new_step' . $stepNumber . '_process';
        } else {
            $action = 'instrument_new_process';
        }

        $form = $this->createForm(new $formType(), $entity, array(
            'action' => $this->generateUrl($action),
            'method' => 'POST',
        ));

        return $form;
    }
}