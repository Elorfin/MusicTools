<?php

namespace MusicTools\TheoryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use Elorfin\ReactorBundle\Entity\NameableTrait;

/**
 * Degree Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="theory_degree")
 */
class Degree
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
     * Get symbol
     * @return string
     */
    public function getSymbol()
    {
        return $this->symbol;
    }

    /**
     * Set symbol
     * @param  string $symbol
     * @return \MusicTools\TheoryBundle\Entity\Degree
     */
    public function setSymbol($symbol)
    {
        $this->symbol = $symbol;

        return $this;
    }
}
