<?php

namespace MusicTools\ScaleBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Scale Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="music_scale")
 */
class Scale
{
    /**
     * Unique identifier of the Scale
     * @var integer
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * Name of the Scale
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $name;
}
