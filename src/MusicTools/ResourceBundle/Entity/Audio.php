<?php

namespace MusicTools\ResourceBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;

/**
 * Audio
 *
 * @ORM\Table(name="audio")
 * @ORM\Entity
 */
class Audio extends File
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;
}
