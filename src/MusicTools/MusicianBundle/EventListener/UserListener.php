<?php

namespace MusicTools\MusicianBundle\EventListener;

use MusicTools\MusicianBundle\Entity\Musician;
use Symfony\Component\DependencyInjection\ContainerAware;
use FOS\UserBundle\Event\FilterUserResponseEvent;

class UserListener extends ContainerAware
{
    /**
     * Initialize a new Musician entity when User is registering
     */
    public function onRegistrationConfirmed(FilterUserResponseEvent $event)
    {
        $user = $event->getUser();

        // Initialize the Musician object
        $musician = new Musician();

        // Link Musician to User
        $musician->setUser($user);

        // Save musician into db
        $om = $this->container->get('doctrine.orm.entity_manager');

        $om->persist($musician);
        $om->flush();
    }
}