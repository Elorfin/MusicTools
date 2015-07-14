<?php

namespace MusicTools\ResourceBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\File\File as BaseFile;

/**
 * File
 *
 * @ORM\MappedSuperclass
 */
abstract class File
{
    /**
     * Unique identifier of the File
     * @var integer
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * Path of the File
     * @var string
     *
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    protected $path;

    /**
     * UploadedFile instance
     * @var \Symfony\Component\HttpFoundation\File\File
     *
     * @Assert\File(maxSize="6000000")
     */
    protected $file;

    /**
     * Get id
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get path
     * @return string
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * Set path
     * @param string $path
     * @return \MusicTools\ResourceBundle\Entity\File
     */
    public function setPath($path)
    {
        $this->path = $path;

        return $this;
    }

    /**
     * Get file
     * @return \Symfony\Component\HttpFoundation\File\File
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * Set file
     * @param \Symfony\Component\HttpFoundation\File\File $file
     * @return \MusicTools\ResourceBundle\Entity\File
     */
    public function setFile(BaseFile $file)
    {
        $this->file = $file;

        return $this;
    }

    public function resetFile()
    {
        unset($this->file);

        return $this;
    }
}
