<?php

namespace MusicTools\TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Chord controller.
 *
 * @Route("/")
 */
class ChordController extends Controller
{
    /**
     * Lists all Chord entities.
     *
     * @Route("/chord", name="theory_chord", options={"expose"=true})
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('MusicToolsTheoryBundle:Chord')->findAll();

        return array(
            'entities' => $entities,
        );
    }
}