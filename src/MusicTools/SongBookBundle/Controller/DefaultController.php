<?php

namespace MusicTools\SongBookBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('MusicToolsSongBookBundle:Default:index.html.twig', array('name' => $name));
    }
}
