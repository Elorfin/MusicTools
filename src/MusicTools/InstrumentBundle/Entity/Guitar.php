<?php

namespace MusicTools\InstrumentBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use MusicTools\MusicianBundle\Entity\OwnableTrait;

/**
 * Guitar Entity
 * Used to store the configuration of a Guitar
 *
 * @ORM\Entity()
 * @ORM\Table(name="guitar")
 */
class Guitar implements \JsonSerializable
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
     * Use Guitar as the default User's guitar
     * @var boolean
     *
     * @ORM\Column(name="use_default", type="boolean", nullable=true)
     */
    protected $default = false;

    /**
     * Manufacturer of the Guitar
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $manufacturer;

    /**
     * Model of the Guitar
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     */
    protected $model;

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
     * Is default ?
     * @return boolean
     */
    public function isDefault()
    {
        return $this->default;
    }

    /**
     * Set default
     * @param  boolean $default
     * @return \MusicTools\InstrumentBundle\Entity\Guitar
     */
    public function setDefault($default)
    {
        $this->default = $default;

        return $this;
    }

    /**
     * Get manufacturer
     * @return string
     */
    public function getManufacturer()
    {
        return $this->manufacturer;
    }

    /**
     * Set manufacturer
     * @param string $manufacturer
     * @return $this
     */
    public function setManufacturer($manufacturer)
    {
        $this->manufacturer = $manufacturer;

        return $this;
    }

    /**
     * Get model
     * @return string
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * Set model
     * @param string $model
     * @return $this
     */
    public function setModel($model)
    {
        $this->model = $model;

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
     * @return \MusicTools\InstrumentBundle\Entity\Guitar
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
     * @return \MusicTools\InstrumentBundle\Entity\Guitar
     */
    public function setFrets($frets)
    {
        $this->frets = $frets;

        return $this;
    }

    /**
     * Serialize the Guitar Entity
     * @return array
     */
    public function jsonSerialize()
    {
        return array (
            'id'           => $this->id,
            'manufacturer' => $this->manufacturer,
            'default'      => $this->default,
            'strings'      => $this->strings,
            'frets'        => $this->frets,
        );
    }
}
