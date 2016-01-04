<?php

namespace MusicTools\SongBookBundle\Controller;

use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use Elorfin\JsonApiBundle\Response\JsonErrorResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use MusicTools\SongBookBundle\Entity\Song;
use MusicTools\SongBookBundle\Form\Type\SongType;
use Symfony\Component\Form\FormInterface;
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
     * @return JsonApiResponse
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
     * Render a Song entity
     * @param  Song $song
     * @return JsonApiResponse
     *
     * @Route("/{id}")
     * @Method("GET")
     */
    public function getAction(Song $song = null)
    {
        return new JsonApiResponse($song);
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
        $song = new Song();
        $form = $this->createForm(new SongType(), $song, array(
            'method' => 'POST',
        ));

        $form->submit(array( $form->getName() => $request->get('data') ));
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($song);
            /*$this->container->get('doctrine.orm.entity_manager')->flush();*/

            return new JsonApiResponse($song, 201);
        }

        $errors = $this->getFormErrors($form);

        return new JsonErrorResponse($errors, 422);
    }

    /**
     * Edit a Song
     * @param  Song $song
     * @param  Request $request
     * @return array
     *
     * @Route("/{id}")
     * @Method("PUT")
     */
    public function updateAction(Song $song, Request $request)
    {
        $form = $form = $this->createForm(new SongType(), $song, array(
            'method' => 'PUT',
        ));

        $data = $request->get('data');

        $form->submit($data);
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($song);
            /*$this->container->get('doctrine.orm.entity_manager')->flush();*/

            return $song;
        }

        $errors = $this->getFormErrors($form);

        return  new JsonErrorResponse($errors, 422);
    }

    /**
     * Delete a Song
     * @param  Song $song
     * @return array
     *
     * @Route("/{id}")
     * @Method("DELETE")
     */
    public function deleteAction(Song $song)
    {

    }

    /**
     * @param $form
     * @return array
     */
    private function getFormErrors(FormInterface $form)
    {
        $errors = array();
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
