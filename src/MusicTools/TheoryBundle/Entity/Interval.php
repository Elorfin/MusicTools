<?php

namespace MusicTools\TheoryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Interval Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="music_interval")
 */
class Interval
{
    /**
     * Unique identifier of the Interval
     * @var integer
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * Name of the Interval
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * Symbol of the Interval
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $symbol;

    /**
     * Value of the Interval (in semitones)
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $value;

    /**
     * Get id
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get name
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set name
     * @param string $name
     * @return $this
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get symbol
     * @return string
     */
    public function getSymbol()
    {
        return $this->symbol;
    }

    /**
     * Set symbol
     * @param string $symbol
     * @return $this
     */
    public function setSymbol($symbol)
    {
        $this->symbol = $symbol;

        return $this;
    }

    /**
     * Get value (in semitones)
     * @return int
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Set value
     * @param integer $value
     * @return $this
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }
}
