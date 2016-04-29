<?php

namespace TheoryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\UniqueIdentifierTrait;
use CommonBundle\Model\NameTrait;

/**
 * Degree Entity.
 *
 * @ORM\Entity()
 * @ORM\Table(name="theory_degree")
 */
class Degree implements \JsonSerializable
{
    /*
     * ID
     */
    use UniqueIdentifierTrait;

    /*
     * Name
     */
    use NameTrait;

    /**
     * Symbol of the Interval.
     *
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $symbol;

    /**
     * Get symbol.
     *
     * @return string
     */
    public function getSymbol()
    {
        return $this->symbol;
    }

    /**
     * Set symbol.
     *
     * @param string $symbol
     *
     * @return Degree
     */
    public function setSymbol($symbol)
    {
        $this->symbol = $symbol;

        return $this;
    }

    /**
     * Serialize the Entity.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return array(
            'type' => 'degrees',
            'id' => $this->id,
            'attributes' => array(
                'name' => $this->name,
                'symbol' => $this->symbol,
            ),
        );
    }
}
