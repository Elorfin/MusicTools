<?php

namespace MusicTools\TheoryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use Elorfin\ReactorBundle\Entity\NameableTrait;

/**
 * Interval Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="theory_interval")
 */
class Interval
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Add Nameable behavior
     */
    use NameableTrait;

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
