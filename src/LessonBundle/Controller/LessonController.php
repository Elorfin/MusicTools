<?php

namespace LessonBundle\Controller;

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
     * @return array
     *
     * @Route("/", name="lesson")
     * @Method("GET")
     */
    public function indexAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')->getRepository('LessonBundle:Lesson')->findAll();

        return array (
            'entities' => $entities,
        );
    }

    public function showAction(Lesson $lesson)
    {

    }
}