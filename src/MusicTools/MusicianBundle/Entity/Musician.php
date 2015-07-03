<?php

namespace MusicTools\MusicianBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Musician Entity
 * Used to store the configuration of a Musician
 *
 * @ORM\Entity()
 * @ORM\Table(name="musician")
 */
class Musician
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

    protected $firstName;

    protected $lastName;

    protected $location;

    protected $birthDate;



    protected $user;
}