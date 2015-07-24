<?php

namespace MusicTools\TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Interval controller.
 *
 * @Route("/interval")
 */
class IntervalController extends Controller
{
    /**
     * Lists all Interval entities.
     *
     * @Route("/", name="interval")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('MusicToolsTheoryBundle:Interval')->findBy(array(), array('value' => 'ASC'));

        return array(
            'entities' => $entities,
        );
    }
}