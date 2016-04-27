<?php

namespace TheoryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\UniqueIdentifierTrait;
use CommonBundle\Model\NameTrait;

/**
 * Interval Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="theory_interval")
 */
class Interval implements \JsonSerializable
{
    /**
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * Name
     */
    use NameTrait;

    /**
     * Symbol of the Interval
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $symbol;

    /**
     * Number of the Interval
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $number;

    /**
     * Quality of the Interval (perfect, minor, major, diminished or augmented)
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $quality;

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
     * @param  string $symbol
     * @return $this
     */
    public function setSymbol($symbol)
    {
        $this->symbol = $symbol;

        return $this;
    }

    /**
     * Get number
     * @return integer
     */
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * Set number
     * @param  integer $number
     * @return $this
     */
    public function setNumber($number)
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Get quality
     * @return string
     */
    public function getQuality()
    {
        return $this->quality;
    }

    /**
     * Set quality
     * @param  string $quality
     * @return $this
     */
    public function setQuality($quality)
    {
        $this->quality = $quality;

        return $this;
    }

    /**
     * Get value (in semitones)
     * @return integer
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Set value
     * @param  integer $value
     * @return $this
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Serialize the Entity
     * @return array
     */
    public function jsonSerialize()
    {
        return array (
            'type' => 'intervals',
            'id'   => $this->id,
            'attributes'  => array (
                'name'    => $this->name,
                'symbol'  => $this->symbol,
                'number'  => $this->number,
                'quality' => $this->quality,
                'value'   => $this->value,
            )
        );
    }
}
