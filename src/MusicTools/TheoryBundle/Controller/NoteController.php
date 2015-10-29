<?php

namespace MusicTools\TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Note controller.
 *
 * @Route("/")
 */
class NoteController extends Controller
{
    /**
     * Lists all Interval entities.
     *
     * @Route("/note", name="theory_note", options={"expose"=true})
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('MusicToolsTheoryBundle:Note')->findBy(array(), array('value' => 'ASC'));

        return array(
            'entities' => $entities,
        );
    }
}