<?php

namespace MusicTools\SongBookBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Routing\ClassResourceInterface;
use MusicTools\SongBookBundle\Entity\Song;
use MusicTools\SongBookBundle\Form\Type\SongType;
use Symfony\Component\HttpFoundation\Request;

class SongController extends Controller implements ClassResourceInterface
{
    /**
     * "get_songs"     [GET] /songs
     *
     * @return array
     */
    public function cgetAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsSongBookBundle:Song')->findAll();

        return $entities;
    }

    /**
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

    // "post_songs"    [POST] /songs
    public function postAction(Request $request)
    {
        /*echo "<pre>";
        var_dump($_FILES);

        var_dump($_REQUEST);
        die();*/

        $entity = new Song();
        $form = $form = $this->createForm(new SongType(), $entity, array(
            'method' => 'POST',
        ));

        $form->handleRequest($request);
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($entity);
            $this->container->get('doctrine.orm.entity_manager')->flush();
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    // "get_song"      [GET] /songs/{id}
    public function getAction($id)
    {
        $entity = $this->getEntity($id);

        return $entity;
    }

    // "edit_song"     [GET] /songs/{id}/edit
    public function editAction($id)
    {
        $entity = $this->getEntity($id);
        $form = $form = $this->createForm(new SongType(), $entity, array(
            'method' => 'POST',
        ));

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    // "put_song"      [PUT] /songs/{id}
    public function putAction($id, Request $request)
    {
        $entity = $this->getEntity($id);
        $form = $form = $this->createForm(new SongType(), $entity, array(
            'method' => 'POST',
        ));

        $form->handleRequest($request);
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($entity);
            $this->container->get('doctrine.orm.entity_manager')->flush();
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    // "remove_song"   [GET] /songs/{id}/remove
    public function removeAction($slug)
    {

    }

    // "delete_song"   [DELETE] /songs/{id}
    public function deleteAction($slug)
    {

    }

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