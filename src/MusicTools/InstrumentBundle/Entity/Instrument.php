<?php

namespace MusicTools\InstrumentBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use Elorfin\ReactorBundle\Entity\NameableTrait;
use MusicTools\MusicianBundle\Entity\OwnableTrait;

/**
 * Guitar Entity
 * Used to store the common configuration of all types of instrument
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument")
 */
class Instrument implements \JsonSerializable
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Add nameable behavior
     */
    use NameableTrait;

    /**
     * Add Ownable behavior
     */
    use OwnableTrait;

    /**
     * Type of the Instrument
     * @var \MusicTools\InstrumentBundle\Entity\InstrumentType
     *
     * @ORM\ManyToOne(targetEntity="MusicTools\InstrumentBundle\Entity\InstrumentType")
     * @ORM\JoinColumn(name="type_id", referencedColumnName="id", nullable=false)
     * @Assert\NotBlank()
     */
    protected $type;

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
     * Get type of the Instrument
     * @return \MusicTools\InstrumentBundle\Entity\InstrumentType
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set type of the Instrument
     * @param \MusicTools\InstrumentBundle\Entity\InstrumentType $type
     * @return \MusicTools\InstrumentBundle\Entity\Instrument
     */
    public function setType(InstrumentType $type)
    {
        $this->type = $type;

        return $this;
    }

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
     * @return \MusicTools\InstrumentBundle\Entity\Instrument
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
     * @return \MusicTools\InstrumentBundle\Entity\Instrument
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
     * @return \MusicTools\InstrumentBundle\Entity\Instrument
     */
    public function setModel($model)
    {
        $this->model = $model;

        return $this;
    }

    public function jsonSerialize()
    {
        return array (
            'type' => 'instruments',
            'id'   => $this->id,
            'attributes' => array(
                'name'         => $this->name,
                'default'      => $this->default,
                'manufacturer' => $this->manufacturer,
                'model'        => $this->model,
            ),
        );
    }
}
