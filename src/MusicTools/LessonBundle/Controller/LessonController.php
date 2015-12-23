<?php

namespace MusicTools\LessonBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

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
     * @Template()
     */
    public function indexAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsLessonBundle:Lesson')->findAll();

        return array (
            'entities' => $entities,
        );
    }
}