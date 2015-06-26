<?php

namespace MusicTools\GuitarBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('MusicToolsGuitarBundle:Default:index.html.twig', array('name' => $name));
    }
}
