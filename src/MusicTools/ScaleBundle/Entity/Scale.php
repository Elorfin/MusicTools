<?php

namespace MusicTools\ScaleBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use Elorfin\ReactorBundle\Entity\NameableTrait;

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
     * Add Nameable behavior
     */
    use NameableTrait;
}
