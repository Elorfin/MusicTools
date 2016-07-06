<?php

namespace LessonBundle\Controller;

use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use Elorfin\JsonApiBundle\Response\JsonErrorResponse;
use LessonBundle\Form\Type\LessonType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use LessonBundle\Entity\Lesson;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Lesson controller.
 *
 * @Route("/lessons")
 */
class LessonController extends Controller
{
    /**
     * List all Lessons.
     *
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
     * Get a Lesson.
     *
     * @param Lesson $lesson - The requested Lesson
     *
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
     * Create a new Lesson.
     *
     * @return JsonApiResponse
     *
     * @Route("")
     * @Method("POST")
     */
    public function createAction()
    {
    }

    /**
     * Update an existing Lesson.
     *
     * @param Lesson  $lesson  - The Lesson to update
     * @param Request $request
     *
     * @return JsonApiResponse
     *
     * @Route("/{id}")
     * @Method("PUT")
     */
    public function updateAction(Lesson $lesson, Request $request)
    {
        $form = $this->createForm(LessonType::class, $lesson, [
            'method' => 'PUT',
        ]);

        $form->handleRequest($request);
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($lesson);
            $this->container->get('doctrine.orm.entity_manager')->flush();

            return new JsonApiResponse($lesson);
        }

        $errors = $this->getFormErrors($form);

        return new JsonErrorResponse($errors, 422);
    }

    /**
     * Delete a Lesson.
     *
     * @param Lesson $lesson - The Lesson to delete
     *
     * @return JsonApiResponse
     *
     * @Route("/{id}")
     * @Method("DELETE")
     */
    public function deleteAction(Lesson $lesson)
    {
        $this->getDoctrine()->getManager()->remove($lesson);
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
        foreach ($form->getErrors(true, false) as $key => $error) {
            $from = $error->getOrigin();

            $errors[$from->getName()] = $error->getMessage();
        }

        // Get errors from children
        foreach ($form->all() as $child) {
            $childErrors = $this->getFormErrors($child);

            if (!empty($childErrors)) {
                $errors[] = $childErrors;
            }
        }

        return $errors;
    }
}
