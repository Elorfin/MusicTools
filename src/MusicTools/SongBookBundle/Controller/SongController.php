<?php

namespace MusicTools\SongBookBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Routing\ClassResourceInterface;
use MusicTools\SongBookBundle\Entity\Song;
use MusicTools\SongBookBundle\Form\Type\SongType;
use Symfony\Component\HttpFoundation\Request;

/**
 * Song CRUD Controller
 */
class SongController extends Controller implements ClassResourceInterface
{
    /**
     * List all Songs
     * "get_songs"     [GET] /songs
     *
     * @return array
     */
    public function cgetAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('MusicToolsSongBookBundle:Song')
            ->findBy(array (), array ('title' => 'ASC'));

        return $entities;
    }

    /**
     * Display a Song entity
     * "get_song"      [GET] /songs/{id}
     * @param $id
     * @return mixed
     */
    public function getAction($id)
    {
        $entity = $this->getEntity($id);

        return $entity;
    }

    /**
     * Display new Song form
     * "new_songs"     [GET] /songs/new
     *
     * @return array
     */
    public function newAction()
    {
        $entity = new Song();
        $form   = $form = $this->createForm(new SongType(), $entity, array(
            'method' => 'POST',
        ));

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Create a new Song
     * "post_songs"    [POST] /songs
     *
     * @param Request $request
     * @return array
     */
    public function postAction(Request $request)
    {
        $entity = new Song();
        $form = $form = $this->createForm(new SongType(), $entity, array(
            'method' => 'POST',
        ));

        $form->handleRequest($request);
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($entity);
            $this->container->get('doctrine.orm.entity_manager')->flush();

            return array (
                'entity' => $entity,
            );
        }

        $errors = $form->getErrors();


        return array(
            'entity' => $entity,
            'errors' => $form,
            'form'   => $form->createView(),
        );
    }

    /**
     * Display edit Song form
     * "edit_song"     [GET] /songs/{id}/edit
     *
     * @param  integer $id
     * @return array
     */
    public function editAction($id)
    {
        $entity = $this->getEntity($id);
        $form = $form = $this->createForm(new SongType(), $entity, array(
            'method' => 'PUT',
        ));

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Edit a Song
     * "put_song"      [PUT] /songs/{id}
     *
     * @param  integer $id
     * @param  Request $request
     * @return array
     */
    public function putAction($id, Request $request)
    {
        $entity = $this->getEntity($id);
        $form = $form = $this->createForm(new SongType(), $entity, array(
            'method' => 'PUT',
        ));

        $form->handleRequest($request);
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($entity);
            $this->container->get('doctrine.orm.entity_manager')->flush();

            return array(
                'entity' => $entity,
            );
        }

        $errors = $form->getErrors();

        return array(
            'entity' => $entity,
            'errors' => $errors,
            'form'   => $form->createView(),
        );
    }

    /**
     * Delete a Song
     * "delete_song"   [DELETE] /songs/{id}
     *
     * @param  integer $id
     * @return array
     */
    public function deleteAction($id)
    {

    }

    /**
     * Retrieve a Song entity
     *
     * @param  integer $id
     * @return \MusicTools\SOngBookBundle\Entity\Song
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
