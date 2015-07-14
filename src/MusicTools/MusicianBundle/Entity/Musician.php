<?php

namespace MusicTools\MusicianBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\UserBundle\Entity\User;

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

    /**
     * Avatar of the Musician
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $avatar;

    /**
     * First name of the Musician
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $firstName;

    /**
     * Last name of the Musician
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $lastName;

    /**
     * Location of the Musician
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $location;

    /**
     * Birth date of the Musician
     * @var string
     *
     * @ORM\Column(type="date")
     */
    protected $birthDate;

    /**
     * User linked to the Musician
     * @var \Elorfin\UserBundle\Entity\User
     *
     * @ORM\OneToOne(targetEntity="Elorfin\UserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    protected $user;

    public function getId()
    {
        return $this->id;
    }

    public function getAvatar()
    {
        return $this->avatar;
    }

    public function setAvatar($avatar)
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getFirstName()
    {
        return $this->firstName;
    }

    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName()
    {
        return $this->lastName;
    }

    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getLocation()
    {
        return $this->location;
    }

    public function setLocation($location)
    {
        $this->location = $location;

        return $this;
    }

    public function getBirthDate()
    {
        return $this->birthDate;
    }

    public function setBirthDate($birthDate)
    {
        $this->birthDate = $birthDate;

        return $this;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function setUser(User $user)
    {
        $this->user = $user;

        return $this;
    }
}
