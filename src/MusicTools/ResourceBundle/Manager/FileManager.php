<?php

namespace MusicTools\ResourceBundle\Manager;

use MusicTools\ResourceBundle\Entity\File;

/**
 * Manages files
 */
class FileManager
{
    /**
     * Kernel root directory
     * @var string
     */
    protected $rootDir;
    /**
     * Directory where are stored the uploaded files
     * @var string
     */
    protected $uploadDir;

    /**
     * Class constructor
     * @param string $rootDir
     * @param string $uploadDir
     */
    public function __construct($rootDir, $uploadDir)
    {
        $this->rootDir   = $rootDir;
        $this->uploadDir = $uploadDir;
    }

    public function getRealPath(File $file)
    {
        $realPath = $this->rootDir . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'web' . DIRECTORY_SEPARATOR . $this->uploadDir . DIRECTORY_SEPARATOR . $file->getPath();

        return $realPath;
    }

    public function getWebPath(File $file)
    {
        return $this->uploadDir . '/' . $file->getPath();
    }

    public function generatePath(File $file)
    {
        $fileToUpload = $file->getFile();
        if (null !== $fileToUpload) {
            // Generate file name
            $path = sha1(uniqid(mt_rand(), true)) . '.' . $fileToUpload->guessExtension();
            $file->setPath($path);
        }
    }

    /**
     * Upload a new file
     * @param \MusicTools\ResourceBundle\Entity\File $file
     */
    public function upload(File $file)
    {
        $fileToUpload = $file->getFile();
        if (null !== $fileToUpload) {
            // Move to upload dir
            $fileToUpload->move(
                $this->rootDir . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'web' . DIRECTORY_SEPARATOR . $this->uploadDir,
                $file->getPath()
            );

            // Remove UploadedFile instance
            $file->resetFile();
        }
    }

    /**
     * Remove a file
     * @param \MusicTools\ResourceBundle\Entity\File $file
     */
    public function remove(File $file)
    {
        if (null !== $file->getPath()) {
            $fullPath = $this->getRealPath($file);
            unlink($fullPath);
        }
    }
}
