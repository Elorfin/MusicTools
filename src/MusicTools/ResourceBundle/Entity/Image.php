<?php

namespace MusicTools\ResourceBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;

/**
 * Image
 *
 * @ORM\Table(name="image")
 * @ORM\Entity
 */
class Image extends File
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;
}
