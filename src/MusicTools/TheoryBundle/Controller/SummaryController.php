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
class SummaryController extends Controller
{
    /**
     * Displays summary.
     * @return array
     *
     * @Route("/", name="theory")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        return array (

        );
    }
}