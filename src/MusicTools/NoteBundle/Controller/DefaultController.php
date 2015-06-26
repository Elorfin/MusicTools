<?php

namespace MusicTools\NoteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('MusicToolsNoteBundle:Default:index.html.twig', array('name' => $name));
    }
}
