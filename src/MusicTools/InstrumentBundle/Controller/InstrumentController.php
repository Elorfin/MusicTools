<?php

namespace MusicTools\InstrumentBundle\Controller;

use MusicTools\InstrumentBundle\Entity\Instrument;
use MusicTools\InstrumentBundle\Form\Type\InstrumentType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Instrument controller.
 *
 * @Route("/")
 */
class InstrumentController extends Controller
{
    /**
     * Lists all Instrument entities.
     * @return array
     *
     * @Route("/", name="instrument")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsInstrumentBundle:Instrument')->findAll();

        return array(
            'entities' => $entities,
        );
    }

    /**
     * Finds and displays an Instrument entity.
     * @param  integer $id
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     * @return array
     *
     * @Route(
     *      "/{id}",
     *      name         = "instrument_show",
     *      requirements = { "id" = "\d+" }
     * )
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsInstrumentBundle:Instrument')->find($id);
        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Instrument entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to create a new Instrument entity.
     * @return array
     *
     * @Route("/new", name="instrument_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        // Initialize empty data
        $entity = new Instrument();

        // Get the Form flow
        $createFlow = $this->container->get('music_tools_instrument.form.instrument_flow');

        // Create Form for the current step in flow
        $form = $createFlow->createForm($entity);

        return array(
            'createFlow'    => $createFlow,
            'form'          => $form->createView(),
            'stepHasErrors' => false,
        );
    }

    /**
     * Creates a new Instrument entity.
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return array
     *
     * @Route("/", name="instrument_create")
     * @Method("POST")
     * @Template("MusicToolsInstrumentBundle:Instrument:new.html.twig")
     */
    public function createAction(Request $request)
    {
        // Initialize empty data
        $entity = new Instrument();

        // Get the Form flow
        $createFlow = $this->container->get('music_tools_instrument.form.instrument_flow');

        // Create Form for the current step in flow
        $form = $createFlow->createForm($entity);

        $stepHasErrors = true;

        $form->handleRequest($request);
        if ($form->isValid()) {
            // Form is valid => go to next action or finish the creation
            $stepHasErrors = false;

            // Store step data
            $createFlow->saveStepData($form);

            if ($createFlow->nextStep($entity)) {
                // There is a next step => replace the form by the new one
                $form = $createFlow->createForm($entity);
            } else {
                // Finished ! Persist created entity
                $this->container->get('doctrine.orm.entity_manager')->persist($entity);
                $this->container->get('doctrine.orm.entity_manager')->flush();

                // Reset form flow
                $createFlow->reset();

                return $this->redirect($this->generateUrl('instrument_show', array('id' => $entity->getId())));
            }
        }

        return array(
            'createFlow'    => $createFlow,
            'form'          => $form->createView(),
            'stepHasErrors' => $stepHasErrors,
        );
    }

    /**
     * Displays a form to edit an existing Guitar entity.
     * @param  integer $id
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     * @return array
     *
     * @Route("/{id}/edit", name="instrument_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsInstrumentBundle:Guitar')->find($id);
        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Guitar entity.');
        }

        $editForm = $this->createEditForm($entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
    * Creates a form to edit a Guitar entity.
    * @param Instrument $entity The entity
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(Instrument $entity)
    {
        $form = $this->createForm(new InstrumentType(), $entity, array(
            'action' => $this->generateUrl('instrument_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        return $form;
    }

    /**
     * Edits an existing Guitar entity.
     * @param  \Symfony\Component\HttpFoundation\Request $request
     * @param  integer $id
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     * @return array
     *
     * @Route("/{id}", name="instrument_update")
     * @Method("PUT")
     * @Template("MusicToolsGuitarBundle:Guitar:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsInstrumentBundle:Instrument')->find($id);
        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Instrument entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $this->container->get('doctrine.orm.entity_manager')->flush();

            return $this->redirect($this->generateUrl('instrument_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Deletes a Guitar entity.
     * @param  \Symfony\Component\HttpFoundation\Request $request
     * @param  integer $id
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     * @return array
     *
     * @Route("/{id}", name="instrument_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsInstrumentBundle:Instrument')->find($id);
            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Guitar entity.');
            }

            $this->container->get('doctrine.orm.entity_manager')->remove($entity);
            $this->container->get('doctrine.orm.entity_manager')->flush();
        }

        return $this->redirect($this->generateUrl('instrument'));
    }

    /**
     * Creates a form to delete a Guitar entity by id.
     * @param  integer $id The entity id
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('instrument_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
