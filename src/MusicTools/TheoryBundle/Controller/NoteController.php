<?php

namespace MusicTools\TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Note controller.
 *
 * @Route("/note")
 */
class NoteController extends Controller
{
    /**
     * Lists all Interval entities.
     *
     * @Route("/", name="note")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('MusicToolsTheoryBundle:Note')->findAll();

        return array(
            'entities' => $entities,
        );
    }
}