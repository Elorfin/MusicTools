<?php

namespace MusicTools\ResourceBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Audio
 *
 * @ORM\Table(name="audio")
 * @ORM\Entity
 */
class Audio extends File
{
    /**
     * Unique identifier of the Audio
     * @var integer
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
}
