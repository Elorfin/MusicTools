<?php

namespace MusicTools\TuningBundle\Twig;

class TuningWidgetExtension
{
    /**
     * Twig environment
     * @var \Twig_Environment
     */
    private $environment;

    public function getName()
    {
        return 'tuning_widget';
    }

    public function initRuntime(\Twig_Environment $environment)
    {
        $this->environment = $environment;
    }

    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('edit', array($this, 'renderWidgetEdit')),
            new \Twig_SimpleFunction('show', array($this, 'renderWidgetShow')),
        );
    }

    /**
     * Display
     */
    public function renderWidgetShow()
    {
        $this->environment->render('MusicToolsTuningBundle:Widget:show.html.twig', array (

        ));
    }

    public function renderWidgetEdit()
    {
        $this->environment->render('MusicToolsTuningBundle:Widget:show.html.twig', array (

        ));
    }
}