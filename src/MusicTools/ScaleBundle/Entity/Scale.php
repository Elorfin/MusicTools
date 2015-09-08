<?php

namespace MusicTools\ScaleBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;

/**
 * Scale Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="music_scale")
 */
class Scale
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Name of the Scale
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $name;
}
