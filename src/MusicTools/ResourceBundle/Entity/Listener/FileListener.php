<?php

namespace MusicTools\ResourceBundle\Entity\Listener;

use Doctrine\ORM\Event\LifecycleEventArgs;
use MusicTools\ResourceBundle\Entity\Image;

class ImageListener
{
    public function prePersist(Image $file, LifecycleEventArgs $event)
    {
        die('coucou');
    }

    public function preUpdate(Image $file, LifecycleEventArgs $event)
    {
        die('coucou2');
    }

    public function postRemove(Image $file, LifecycleEventArgs $event)
    {

    }
}