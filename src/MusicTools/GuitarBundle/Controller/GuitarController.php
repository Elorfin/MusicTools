<?php

namespace MusicTools\GuitarBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use MusicTools\GuitarBundle\Entity\Guitar;
use MusicTools\GuitarBundle\Form\Type\GuitarType;

/**
 * Guitar controller.
 *
 * @Route("/guitar")
 */
class GuitarController extends Controller
{

    /**
     * Lists all Guitar entities.
     *
     * @Route("/", name="guitar")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('MusicToolsGuitarBundle:Guitar')->findAll();

        return array(
            'entities' => $entities,
        );
    }
    /**
     * Creates a new Guitar entity.
     *
     * @Route("/", name="guitar_create")
     * @Method("POST")
     * @Template("MusicToolsGuitarBundle:Guitar:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new Guitar();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('guitar_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a form to create a Guitar entity.
     *
     * @param Guitar $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(Guitar $entity)
    {
        $form = $this->createForm(new GuitarType(), $entity, array(
            'action' => $this->generateUrl('guitar_create'),
            'method' => 'POST',
        ));

        return $form;
    }

    /**
     * Displays a form to create a new Guitar entity.
     *
     * @Route("/new", name="guitar_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Guitar();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Guitar entity.
     *
     * @Route("/{id}", name="guitar_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('MusicToolsGuitarBundle:Guitar')->find($id);

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
     * @Route("/{id}/edit", name="guitar_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('MusicToolsGuitarBundle:Guitar')->find($id);

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
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(Guitar $entity)
    {
        $form = $this->createForm(new GuitarType(), $entity, array(
            'action' => $this->generateUrl('guitar_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        return $form;
    }
    /**
     * Edits an existing Guitar entity.
     *
     * @Route("/{id}", name="guitar_update")
     * @Method("PUT")
     * @Template("MusicToolsGuitarBundle:Guitar:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('MusicToolsGuitarBundle:Guitar')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Guitar entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('guitar_edit', array('id' => $id)));
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
     * @Route("/{id}", name="guitar_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('MusicToolsGuitarBundle:Guitar')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Guitar entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('guitar'));
    }

    /**
     * Creates a form to delete a Guitar entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('guitar_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
