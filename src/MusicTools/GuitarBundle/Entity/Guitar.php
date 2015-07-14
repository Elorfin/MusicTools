<?php

namespace MusicTools\GuitarBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Guitar Entity
 * Used to store the configuration of a Guitar
 *
 * @ORM\Entity()
 * @ORM\Table(name="guitar")
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
    protected $strings = 6;

    /**
     * Tuning of the Guitar
     * @var
     */
    protected $tuning;

    protected $user;

    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    public function getHeadstock()
    {
        return $this->headstock;
    }

    public function setHeadstock($headstock)
    {
        $this->headstock = $headstock;

        return $this;
    }

    public function getStrings()
    {
        return $this->strings;
    }

    public function setStrings($strings)
    {
        $this->strings = $strings;

        return $this;
    }
}
