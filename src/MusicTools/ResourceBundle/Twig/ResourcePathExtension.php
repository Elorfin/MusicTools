<?php

namespace MusicTools\ResourceBundle\Twig;

use MusicTools\ResourceBundle\Manager\FileManager;
use MusicTools\ResourceBundle\Entity\File;

class ResourcePathExtension extends \Twig_Extension
{
    /**
     * File manager
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

    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('resource_path', array($this, 'getResourcePath')),
        );
    }

    public function getResourcePath(File $file)
    {
        $fullPath = null;
        if (!empty($file)) {
            $fullPath = $this->fileManager->getWebPath($file);
        }

        return $fullPath;
    }

    public function getName()
    {
        return 'resource_path';
    }
}
