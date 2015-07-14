<?php

namespace MusicTools\ResourceBundle\Manager;

use MusicTools\ResourceBundle\Entity\File;

/**
 * Manages files
 */
class FileManager
{
    /**
     * Directory where are stored the uploaded files
     * @var string
     */
    protected $uploadDir;

    /**
     * @param string $uploadDir
     */
    public function __construct($uploadDir)
    {
        $this->uploadDir = $uploadDir;
    }

    /**
     * Upload a new file
     * @param \MusicTools\ResourceBundle\Entity\File $file
     */
    public function upload(File $file)
    {
        $fileToUpload = $file->getFile();
        if (null !== $fileToUpload) {
            // Generate file name
            $name = sha1(uniqid(mt_rand(), true)) . '.' . $fileToUpload->guessExtension();
            $file->setPath($name);

            // Move to upload dir
            $fileToUpload->move($this->uploadDir, $fileToUpload->getPath());

            // Remove UploadedFile instance
            $file->setFile(null);
        }
    }

    /**
     * Remove a file
     * @param \MusicTools\ResourceBundle\Entity\File $file
     */
    public function remove(File $file)
    {
        if (null !== $file->getPath()) {
            $fullPath = $this->uploadDir . DIRECTORY_SEPARATOR . $file->getPath();
            unlink($fullPath);
        }
    }
}
