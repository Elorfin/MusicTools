<?php

namespace MusicTools\SongBookBundle\Controller;

use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use MusicTools\SongBookBundle\Entity\Song;
use MusicTools\SongBookBundle\Form\Type\SongType;
use Symfony\Component\HttpFoundation\Request;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * Song CRUD Controller
 *
 * @Route("/songs")
 */
class SongController extends Controller
{
    /**
     * List all Songs
     * @return array
     *
     * @Route("")
     * @Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('MusicToolsSongBookBundle:Song')
            ->findBy(array(), array('name' => 'ASC'));

        return new JsonApiResponse($entities);
    }

    /**
     * Display a Song entity
     * @param $id
     * @return mixed
     *
     * @Route("/{id}")
     * @Method("GET")
     */
    public function getAction($id)
    {
        $entity = $this->getEntity($id);

        return $entity;
    }

    /**
     * Create a new Song
     * @param Request $request
     * @return array
     *
     * @Route("")
     * @Method("POST")
     */
    public function createAction(Request $request)
    {
        $entity = new Song();
        $form = $this->createForm(new SongType(), $entity, array(
            'method' => 'POST',
        ));

        $form->submit(array( $form->getName() => $request->get('data') ));
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($entity);
            /*$this->container->get('doctrine.orm.entity_manager')->flush();*/

            return $entity;
        }

        $errors = $form->getErrors();

        return array(
            'errors' => $errors,
        );
    }

    /**
     * Edit a Song
     * @param  integer $id
     * @param  Request $request
     * @return array
     *
     * @Route("/{id}")
     * @Method("PUT")
     */
    public function updateAction($id, Request $request)
    {
        $entity = $this->getEntity($id);
        $form = $form = $this->createForm(new SongType(), $entity, array(
            'method' => 'PUT',
        ));

        $data = $request->get('data');

        $form->submit($data);
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($entity);
            /*$this->container->get('doctrine.orm.entity_manager')->flush();*/

            return $entity;
        }

        $errors = $form->getErrors();

        return array(
            'errors' => $errors,
        );
    }

    /**
     * Delete a Song
     * @param  integer $id
     * @return array
     *
     * @Route("/{id}")
     * @Method("DELETE")
     */
    public function deleteAction($id)
    {

    }

    /**
     * Retrieve a Song entity
     *
     * @param  integer $id
     * @return \MusicTools\SongBookBundle\Entity\Song
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    private function getEntity($id)
    {
        $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsSongBookBundle:Song')->findOneBy( array (
            'id' => $id,
        ));

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Song entity.');
        }

        return $entity;
    }
}
