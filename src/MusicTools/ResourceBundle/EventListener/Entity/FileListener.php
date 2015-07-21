<?php

namespace MusicTools\ResourceBundle\EventListener\Entity;

use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use MusicTools\ResourceBundle\Manager\FileManager;
use MusicTools\ResourceBundle\Entity\File;

/**
 * Listens to Doctrine events for File entities
 */
class FileListener
{
    /**
     * File Manager
     * @var \MusicTools\ResourceBundle\Manager\FileManager
     */
    protected $fileManager;

    /**
     * Class constructor
     * @param \MusicTools\ResourceBundle\Manager\FileManager $fileManager
     */
    public function __construct(FileManager $fileManager)
    {
        $this->fileManager = $fileManager;
    }

    /**
     * Performs actions before persist and update
     *
     * @param \MusicTools\ResourceBundle\Entity\File                $file
     * @param \Doctrine\Common\Persistence\Event\LifecycleEventArgs $event
     */
    public function preUploadHandler(File $file, LifecycleEventArgs $event)
    {
        // Generate file path
        $this->fileManager->generatePath($file);
    }

    /**
     * Performs actions after persisting a new Entity
     *
     * @param \MusicTools\ResourceBundle\Entity\File                $file
     * @param \Doctrine\Common\Persistence\Event\LifecycleEventArgs $event
     */
    public function postPersist(File $file, LifecycleEventArgs $event)
    {
        // Save uploaded file
        $this->fileManager->upload($file);
    }

    /**
     * Performs actions after updating an Entity
     *
     * @param \MusicTools\ResourceBundle\Entity\File                $file
     * @param \Doctrine\Common\Persistence\Event\LifecycleEventArgs $event
     */
    public function postUpdate(File $file, LifecycleEventArgs $event)
    {
        // Save uploaded file
        $this->fileManager->upload($file);

    }

    /**
     * Performs actions after removing an Entity
     *
     * @param \MusicTools\ResourceBundle\Entity\File                $file
     * @param \Doctrine\Common\Persistence\Event\LifecycleEventArgs $event
     */
    public function postRemove(File $file, LifecycleEventArgs $event)
    {
        // Remove uploaded file
        $this->fileManager->remove($file);
    }
}
