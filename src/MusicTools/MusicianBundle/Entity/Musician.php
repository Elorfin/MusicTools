<?php

namespace MusicTools\MusicianBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use MusicTools\ResourceBundle\Entity\Image;
use FOS\UserBundle\Model\User;

/**
 * Musician Entity
 * Used to store the configuration of a Musician
 *
 * @ORM\Entity(repositoryClass="MusicTools\MusicianBundle\Repository\MusicianRepository")
 * @ORM\Table(name="musician")
 */
class Musician
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Avatar of the Musician
     * @var \MusicTools\ResourceBundle\Entity\Image
     *
     * @ORM\ManyToOne(targetEntity="MusicTools\ResourceBundle\Entity\Image", cascade={"remove", "persist"})
     * @ORM\JoinColumn(name="avatar_id", referencedColumnName="id", nullable=true, onDelete="SET NULL")
     */
    protected $avatar;

    /**
     * Description of the Musician
     * @var string
     *
     * @ORM\Column(type="text", nullable=true)
     */
    protected $description;

    /**
     * Status of the Musician
     * @var string
     *
     * @ORM\Column(type="text", nullable=true)
     */
    protected $status;

    /**
     * First name of the Musician
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     */
    protected $firstName;

    /**
     * Last name of the Musician
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     */
    protected $lastName;

    /**
     * Location of the Musician
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     */
    protected $location;

    /**
     * Birth date of the Musician
     * @var \DateTime
     *
     * @ORM\Column(type="date", nullable=true)
     */
    protected $birthDate;

    /**
     * Gender of the Musician
     * @var string
     * @ORM\Column(type="string", nullable=true)
     */
    protected $gender;

    /**
     * Website of the Musician
     * @var string
     * @ORM\Column(type="string", nullable=true)
     */
    protected $website;

    /**
     * User linked to the Musician
     * @var \FOS\UserBundle\Model\User
     *
     * @ORM\OneToOne(targetEntity="Elorfin\UserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    protected $user;

    /**
     * Get avatar
     * @return \MusicTools\ResourceBundle\Entity\Image
     */
    public function getAvatar()
    {
        return $this->avatar;
    }

    /**
     * Set avatar
     * @param  \MusicTools\ResourceBundle\Entity\Image $avatar
     * @return \MusicTools\MusicianBundle\Entity\Musician
     */
    public function setAvatar(Image $avatar)
    {
        $this->avatar = $avatar;

        return $this;
    }

    /**
     * Get description
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set description
     * @param  string $description
     * @return \MusicTools\MusicianBundle\Entity\Musician
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get status
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set status
     * @param  string $status
     * @return \MusicTools\MusicianBundle\Entity\Musician
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get first name
     * @return string
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set first name
     * @param  string $firstName
     * @return \MusicTools\MusicianBundle\Entity\Musician
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get last name
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set last name
     * @param  string $lastName
     * @return \MusicTools\MusicianBundle\Entity\Musician
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get location
     * @return string
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * Set location
     * @param  string $location
     * @return \MusicTools\MusicianBundle\Entity\Musician
     */
    public function setLocation($location)
    {
        $this->location = $location;

        return $this;
    }

    /**
     * Get birth date
     * @return \DateTime
     */
    public function getBirthDate()
    {
        return $this->birthDate;
    }

    /**
     * Set birth date
     * @param  \DateTime $birthDate
     * @return \MusicTools\MusicianBundle\Entity\Musician
     */
    public function setBirthDate(\DateTime $birthDate = null)
    {
        $this->birthDate = $birthDate;

        return $this;
    }

    /**
     * Get gender
     * @return string
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * Set gender
     * @param  string $gender
     * @return \MusicTools\MusicianBundle\Entity\Musician
     */
    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * Get website
     * @return string
     */
    public function getWebsite()
    {
        return $this->website;
    }

    /**
     * Set website
     * @param  string $website
     * @return \MusicTools\MusicianBundle\Entity\Musician
     */
    public function setWebsite($website)
    {
        $this->website = $website;

        return $this;
    }

    /**
     * Get User
     * @return \Elorfin\UserBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set User
     * @param  \FOS\UserBundle\Model\User $user
     * @return \MusicTools\MusicianBundle\Entity\Musician
     */
    public function setUser(User $user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Wrapper to access username of the User
     * @return string
     */
    public function getUsername()
    {
        return $this->user->getUsername();
    }

    public function getLastLogin()
    {
        return $this->user->getLastLogin();
    }
}
