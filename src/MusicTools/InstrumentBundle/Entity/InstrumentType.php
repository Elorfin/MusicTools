<?php

namespace MusicTools\InstrumentBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\NameableTrait;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;

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
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Add Nameable behavior
     */
    use NameableTrait;

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
        return array(
            'type' => 'instrument_types',
            'id'   => $this->id,
            'attributes' => array(
                'name'     => $this->name,
                'icon'     => $this->icon,
                'class'    => $this->class,
                'template' => $this->template,
            ),
        );
    }
}