<?php

namespace InstrumentBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * InstrumentType Entity
 * Stores the default configuration for each instrument type (e.g. guitar, bass, recorder, piano)
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_type")
 */
class InstrumentType implements \JsonSerializable
{
    /**
     * Unique identifier of the Instrument Type
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * Name of the Instrument Type
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * Icon of the Instrument Type
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $icon;

    /**
     * Is the default InstrumentType ?
     * @var boolean
     * @ORM\Column(type="boolean", name="is_default")
     */
    protected $default;

    /**
     * Prefix used to retrieve corresponding Specification and Template class
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $prefix;

    /**
     * Is the instrument can play several notes simultaneously ? (to play chords)
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    protected $polyphonic = true;

    /**
     * Get id
     * @return string
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
     * @param  string $name
     * @return InstrumentType
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get icon
     * @return string
     */
    public function getIcon()
    {
        return $this->icon;
    }

    /**
     * Set icon
     * @param  string $icon
     * @return $this
     */
    public function setIcon($icon)
    {
        $this->icon = $icon;

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
     * @return $this
     */
    public function setDefault($default)
    {
        $this->default = $default;

        return $this;
    }

    /**
     * Get prefix
     * @return string
     */
    public function getPrefix()
    {
        return $this->prefix;
    }

    /**
     * Set prefix
     * @param  string $prefix
     * @return $this
     */
    public function setPrefix($prefix)
    {
        $this->prefix = $prefix;

        return $this;
    }

    /**
     * Get Specification class name
     * @return string
     */
    public function getClass()
    {
        return '\\InstrumentBundle\\Entity\\Specification\\' . $this->prefix . 'Specification';
    }

    /**
     * Get Template class name
     * @return string
     */
    public function getTemplate()
    {
        return '\\InstrumentBundle\\Entity\\Template\\' . $this->prefix . 'Template';
    }

    /**
     * Is polyphonic ?
     * @return boolean
     */
    public function isPolyphonic()
    {
        return $this->polyphonic;
    }

    /**
     * Set polyphonic
     * @param  boolean $polyphonic
     * @return $this
     */
    public function setPolyphonic($polyphonic)
    {
        $this->polyphonic = $polyphonic;

        return $this;
    }

    public function jsonSerialize()
    {
        return [
            // Identifier of the Resource
            'type' => 'instrument_types',
            'id'   => $this->id,

            // Attributes of the Resource
            'attributes' => [
                'name'       => $this->name,
                'icon'       => $this->icon,
                'default'    => $this->default,
                'prefix'     => $this->prefix,
                'polyphonic' => $this->polyphonic,
            ],
        ];
    }
}
