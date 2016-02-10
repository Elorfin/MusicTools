<?php

namespace LessonBundle\Controller;

use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use LessonBundle\Entity\Lesson;

/**
 * Lesson controller.
 *
 * @Route("/lessons")
 */
class LessonController extends Controller
{
    /**
     * List all Lessons
     * @return JsonApiResponse
     *
     * @Route("")
     * @Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container
            ->get('doctrine.orm.entity_manager')
            ->getRepository('LessonBundle:Lesson')
            ->findAll();

        return new JsonApiResponse($entities);
    }

    /**
     * Get a Lesson
     * @param  Lesson $lesson - The requested Lesson
     * @return JsonApiResponse
     *
     * @Route("/{id}")
     * @Method("GET")
     */
    public function getAction(Lesson $lesson)
    {
        return new JsonApiResponse($lesson);
    }

    /**
     * Create a new Lesson
     * @return JsonApiResponse
     *
     * @Route("")
     * @Method("POST")
     */
    public function createAction()
    {

    }

    /**
     * Update an existing Lesson
     * @param  Lesson $lesson - The Lesson to update
     * @return JsonApiResponse
     *
     * @Route("/{id}")
     * @Method("PUT")
     */
    public function updateAction(Lesson $lesson)
    {

    }

    /**
     * Delete a Lesson
     * @param  Lesson $lesson - The Lesson to delete
     * @return JsonApiResponse
     *
     * @Route("/{id}")
     * @Method("DELETE")
     */
    public function deleteAction(Lesson $lesson)
    {

    }
}
