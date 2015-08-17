<?php

namespace MusicTools\MusicianBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Profile controller.
 *
 * @Route("/musician")
 */
class ProfileController extends Controller
{
    /**
     * Lists all Musician entities.
     *
     * @Route("/", name="musician")
     * @Method("GET")
     * @Template()
     */
    public function showAction()
    {
        return $this->render('MusicToolsMusicianBundle:Profile:show.html.twig');
    }
}
