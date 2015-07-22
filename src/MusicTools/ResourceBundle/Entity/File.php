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
     * @ORM\Column(type="string", length=255, nullable=false)
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
     * Date of creation
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime")
     */
    protected $createdAt;

    /**
     * Date last update
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime")
     */
    protected $updatedAt;

    /**
     * Class constructor
     */
    public function __construct()
    {
        $this->createdAt = $this->updatedAt = new \DateTime();
    }

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
     * @param  \Symfony\Component\HttpFoundation\File\File $file
     * @return \MusicTools\ResourceBundle\Entity\File
     */
    public function setFile(BaseFile $file)
    {
        $this->file = $file;

        // Update the field updatedAt, in order to trigger the Doctrine Update Event
        $this->setUpdatedAt(new \DateTime());

        return $this;
    }

    /**
     * Remove current UploadedFile
     * @return \MusicTools\ResourceBundle\Entity\File
     */
    public function resetFile()
    {
        unset($this->file);

        return $this;
    }

    /**
     * Get updated at
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set updated at
     * @param  \DateTime $updatedAt
     * @return \MusicTools\ResourceBundle\Entity\File
     */
    public function setUpdatedAt(\DateTime $updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get created at
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set created at
     * @param  \DateTime $createdAt
     * @return \MusicTools\ResourceBundle\Entity\File
     */
    public function setCreatedAt(\DateTime $createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
