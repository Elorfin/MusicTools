<?php

namespace MusicTools\InstrumentBundle\Controller;



use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use MusicTools\InstrumentBundle\Entity\Guitar;
use MusicTools\InstrumentBundle\Form\Type\GuitarType;


/**
 * Guitar controller.
 *
 * @Route("/instrument")
 */
class InstrumentController extends Controller
{
    /**
     * Lists all Instrument entities.
     *
     * @Route("/", name="instrument")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsInstrumentBundle:Guitar')->findAll();

        return array(
            'entities' => $entities,
        );
    }

    /**
     * Finds and displays a Guitar entity.
     *
     * @Route("/{id}", name="instrument_show", requirements={"id" = "\d+"})
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsInstrumentBundle:Guitar')->find($id);
        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Guitar entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Guitar entity.
     *
     * @Route("/{id}/edit", name="instrument_edit", requirements={"id" = "\d+"})
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
    *
    * @param Guitar $entity The entity
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(Guitar $entity)
    {
        $form = $this->createForm(new GuitarType(), $entity, array(
            'action' => $this->generateUrl('instrument_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        return $form;
    }

    /**
     * Edits an existing Guitar entity.
     *
     * @Route("/{id}", name="instrument_update", requirements={"id" = "\d+"})
     * @Method("PUT")
     * @Template("MusicToolsGuitarBundle:Guitar:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsInstrumentBundle:Guitar')->find($id);
        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Guitar entity.');
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
     *
     * @Route("/{id}", name="instrument_delete", requirements={"id" = "\d+"})
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsInstrumentBundle:Guitar')->find($id);
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
     *
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
