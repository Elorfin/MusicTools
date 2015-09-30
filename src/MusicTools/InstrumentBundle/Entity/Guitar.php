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
 * @ORM\Table(name="instrument_guitar")
 */
class Guitar extends AbstractStringInstrument implements \JsonSerializable
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
