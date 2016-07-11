<?php

namespace InstrumentBundle\Entity;

use CommonBundle\Model\NameTrait;
use CommonBundle\Model\UniqueIdentifierTrait;
use Doctrine\ORM\Mapping as ORM;

/**
 * InstrumentType Entity
 * Stores the default configuration for each instrument type (e.g. guitar, bass, recorder, piano).
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_type")
 */
class InstrumentType implements \JsonSerializable
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
     * Icon of the Instrument Type.
     *
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $icon;

    /**
     * Prefix used to retrieve corresponding Specification class.
     *
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $prefix;

    /**
     * Is the instrument can play several notes simultaneously ? (to play chords).
     *
     * @var bool
     *
     * @ORM\Column(type="boolean")
     */
    protected $polyphonic = true;

    /**
     * Get icon.
     *
     * @return string
     */
    public function getIcon()
    {
        return $this->icon;
    }

    /**
     * Set icon.
     *
     * @param string $icon
     *
     * @return $this
     */
    public function setIcon($icon)
    {
        $this->icon = $icon;

        return $this;
    }

    /**
     * Get prefix.
     *
     * @return string
     */
    public function getPrefix()
    {
        return $this->prefix;
    }

    /**
     * Set prefix.
     *
     * @param string $prefix
     *
     * @return $this
     */
    public function setPrefix($prefix)
    {
        $this->prefix = $prefix;

        return $this;
    }

    /**
     * Get Specification class name.
     *
     * @return string
     */
    public function getClass()
    {
        return '\\InstrumentBundle\\Entity\\Specification\\'.$this->prefix.'Specification';
    }

    /**
     * Is polyphonic ?
     *
     * @return bool
     */
    public function isPolyphonic()
    {
        return $this->polyphonic;
    }

    /**
     * Set polyphonic.
     *
     * @param bool $polyphonic
     *
     * @return $this
     */
    public function setPolyphonic($polyphonic)
    {
        $this->polyphonic = $polyphonic;

        return $this;
    }

    /**
     * Serialize the Entity.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            // Identifier of the Resource
            'type' => 'instrument_types',
            'id' => $this->id,

            // Attributes of the Resource
            'attributes' => [
                'name' => $this->name,
                'icon' => $this->icon,
                'prefix' => $this->prefix,
                'polyphonic' => $this->polyphonic,
            ],
        ];
    }
}
