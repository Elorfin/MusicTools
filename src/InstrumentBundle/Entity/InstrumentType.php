<?php

namespace InstrumentBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * InstrumentType Entity
 * Stores the default configuration for each instrument type (e.g. guitar 6 strings, guitar 7 strings, bass)
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
     * @var string
     * @ORM\Column(type="string")
     */
    protected $icon;

    /**
     * Entity class
     * @var string
     * @ORM\Column(type="string")
     */
    protected $class;

    /**
     * Template class
     * @var string
     * @ORM\Column(type="string")
     */
    protected $template;

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
     * Get class
     * @return string
     */
    public function getClass()
    {
        return $this->class;
    }

    /**
     * Set class
     * @param  string $class
     * @return $this
     */
    public function setClass($class)
    {
        $this->class = $class;

        return $this;
    }

    /**
     * Get template
     * @return string
     */
    public function getTemplate()
    {
        return $this->template;
    }

    /**
     * Set template
     * @param  string $template
     * @return $this
     */
    public function setTemplate($template)
    {
        $this->template = $template;

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
                'name'     => $this->name,
                'icon'     => $this->icon,
                'class'    => $this->class,
                'template' => $this->template,
            ],

            // Relationships with other Resources
            'relationships' => [

            ]
        ];
    }
}
