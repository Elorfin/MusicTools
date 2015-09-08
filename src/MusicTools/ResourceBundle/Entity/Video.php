<?php

namespace MusicTools\ResourceBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;

/**
 * Video
 *
 * @ORM\Table(name="video")
 * @ORM\Entity
 */
class Video extends File
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;
}
