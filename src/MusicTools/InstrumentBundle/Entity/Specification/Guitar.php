<?php

namespace MusicTools\InstrumentBundle\Entity\Specification;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use MusicTools\MusicianBundle\Entity\OwnableTrait;

/**
 * Guitar Entity
 * Used to store the configuration of a Guitar
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_guitar")
 */
class Guitar extends AbstractSpecification implements \JsonSerializable
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Add Ownable behavior
     */
    use OwnableTrait;

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
     * Number of frets
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $frets = 24;

    /**
     * Tuning of the Guitar
     * @var
     */
    protected $tuning;

    /**
     * Get headstock
     * @return string
     */
    public function getHeadstock()
    {
        return $this->headstock;
    }

    /**
     * Set headstock
     * @param  string $headstock
     * @return $this
     */
    public function setHeadstock($headstock)
    {
        $this->headstock = $headstock;

        return $this;
    }

    /**
     * Get number of strings
     * @return integer
     */
    public function getStrings()
    {
        return $this->strings;
    }

    /**
     * Set number of strings
     * @param  integer $strings
     * @return \MusicTools\InstrumentBundle\Entity\Instrument\Guitar
     */
    public function setStrings($strings)
    {
        $this->strings = $strings;

        return $this;
    }

    /**
     * Get number of frets
     * @return integer
     */
    public function getFrets()
    {
        return $this->frets;
    }

    /**
     * Get number of frets
     * @param  integer $frets
     * @return \MusicTools\InstrumentBundle\Entity\Instrument\Guitar
     */
    public function setFrets($frets)
    {
        $this->frets = $frets;

        return $this;
    }

    /**
     * Serialize the Entity
     * @return array
     */
    public function jsonSerialize()
    {
        return array (
            'id'      => $this->id,
            'strings' => $this->strings,
            'frets'   => $this->frets,
        );
    }
}
