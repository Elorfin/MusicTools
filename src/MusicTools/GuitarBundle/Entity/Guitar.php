<?php

namespace MusicTools\GuitarBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Guitar Entity
 * Used to store the configuration of a Guitar
 *
 * @ORM\Entity()
 */
class Guitar
{
    /**
     * Unique identifier of the Guitar
     * @var integer
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * Name of the Guitar
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * Shape of the guitar's headstock (6-in-line or 3+3 for a 6 strings guitar)
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $headstock;

    /**
     * Number of strings
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $strings;

    /**
     * Tuning of the Guitar
     * @var
     */
    protected $tuning;

    protected $user;
}