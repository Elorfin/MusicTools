<?php

namespace SongBookBundle\Controller;

use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use Elorfin\JsonApiBundle\Response\JsonErrorResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use SongBookBundle\Entity\Song;
use SongBookBundle\Form\Type\SongType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;

/**
 * Song CRUD Controller.
 *
 * @EXT\Route("/songs")
 */
class SongController extends Controller
{
    /**
     * List all Songs.
     *
     * @return JsonApiResponse
     *
     * @EXT\Route("")
     * @EXT\Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container
            ->get('doctrine.orm.entity_manager')
            ->getRepository('SongBookBundle:Song')
            ->findBy([], ['name' => 'ASC']);

        return new JsonApiResponse($entities);
    }

    /**
     * Render a Song entity.
     *
     * @param Song $song
     *
     * @return JsonApiResponse
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("GET")
     */
    public function getAction(Song $song)
    {
        return new JsonApiResponse($song);
    }

    /**
     * Create a new Song.
     *
     * @param Request $request
     *
     * @return JsonApiResponse|JsonErrorResponse
     *
     * @EXT\Route("")
     * @EXT\Method("POST")
     */
    public function createAction(Request $request)
    {
        $song = new Song();
        $form = $this->createForm(SongType::class, $song);

        $form->submit($request->get('data'));
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($song);
            $this->container->get('doctrine.orm.entity_manager')->flush();

            return new JsonApiResponse($song, 201);
        }

        $errors = $this->getFormErrors($form);

        return new JsonErrorResponse($errors, 422);
    }

    /**
     * Edit a Song.
     *
     * @param Song    $song
     * @param Request $request
     *
     * @return JsonApiResponse|JsonErrorResponse
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("PUT")
     */
    public function updateAction(Song $song, Request $request)
    {
        $form = $this->createForm(SongType::class, $song, [
            'method' => 'PUT',
        ]);

        $form->submit([$form->getName() => $request->get('data')]);
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($song);
            $this->container->get('doctrine.orm.entity_manager')->flush();

            return new JsonApiResponse($song);
        }

        $errors = $this->getFormErrors($form);

        return new JsonErrorResponse($errors, 422);
    }

    /**
     * Delete a Song.
     *
     * @param Song $song
     *
     * @return JsonApiResponse
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("DELETE")
     */
    public function deleteAction(Song $song)
    {
        $this->getDoctrine()->getManager()->remove($song);
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
