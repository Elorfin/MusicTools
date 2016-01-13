<?php

namespace UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ResourceBundle\Entity\Image;

/**
 * User Entity
 * Used to store the configuration of a User
 *
 * @ORM\Entity(repositoryClass="UserBundle\Repository\UserRepository")
 * @ORM\Table(name="user")
 */
class User
{
    /**
     * Unique identifier of the User
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * Username
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $username;

    /**
     * Avatar of the User
     * @var \Elorfin\ResourceBundle\Entity\Image
     *
     * @ORM\ManyToOne(targetEntity="Elorfin\ResourceBundle\Entity\Image", cascade={"remove", "persist"})
     * @ORM\JoinColumn(name="avatar_id", referencedColumnName="id", nullable=true, onDelete="SET NULL")
     */
    protected $avatar;

    /**
     * Description of the User
     * @var string
     *
     * @ORM\Column(type="text", nullable=true)
     */
    protected $description;

    /**
     * Status of the User
     * @var string
     *
     * @ORM\Column(type="text", nullable=true)
     */
    protected $status;

    /**
     * First name of the User
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     */
    protected $firstName;

    /**
     * Last name of the User
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     */
    protected $lastName;

    /**
     * Location of the User
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     */
    protected $location;

    /**
     * Birth date of the User
     * @var \DateTime
     *
     * @ORM\Column(type="date", nullable=true)
     */
    protected $birthDate;

    /**
     * Gender of the User
     * @var string
     * @ORM\Column(type="string", nullable=true)
     */
    protected $gender;

    /**
     * Website of the User
     * @var string
     * @ORM\Column(type="string", nullable=true)
     */
    protected $website;

    /**
     * Last login of the User
     * @var \DateTime
     *
     * @ORM\Column(type="date", nullable=true)
     */
    protected $lastLogin;

    /**
     * Get id
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get username
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set username
     * @param  string $username
     * @return User
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get avatar
     * @return \Elorfin\ResourceBundle\Entity\Image
     */
    public function getAvatar()
    {
        return $this->avatar;
    }

    /**
     * Set avatar
     * @param  \Elorfin\ResourceBundle\Entity\Image $avatar
     * @return User
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
     * @return User
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
     * @return User
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
     * @return User
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
     * @return User
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
     * @return User
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
     * @return User
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
     * @return User
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
     * @return User
     */
    public function setWebsite($website)
    {
        $this->website = $website;

        return $this;
    }

    /**
     * Get last login
     * @return \DateTime
     */
    public function getLastLogin()
    {
        return $this->lastLogin;
    }

    /**
     * Set last login
     * @param  \DateTime $lastLogin
     * @return User
     */
    public function setLastLogin(\DateTime $lastLogin)
    {
        $this->lastLogin = $lastLogin;

        return $this;
    }
}
