<?php

namespace InstrumentBundle\Entity\Template;

use Doctrine\ORM\Mapping as ORM;
use InstrumentBundle\Entity\InstrumentType;

/**
 * Base class for instrument templates
 * @ORM\MappedSuperclass()
 */
abstract class AbstractTemplate implements \JsonSerializable
{
    /**
     * Name of the Template
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * @var InstrumentType
     *
     * @ORM\ManyToOne(targetEntity="InstrumentBundle\Entity\InstrumentType")
     * @ORM\JoinColumn(name="type_id", referencedColumnName="id", nullable=false)
     */
    protected $type;

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
     * @return AbstractTemplate
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**+
     * Get type of the Instrument
     * @return InstrumentType
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set type of the Instrument
     * @param  InstrumentType $type
     * @return AbstractTemplate
     */
    public function setType(InstrumentType $type)
    {
        $this->type = $type;

        return $this;
    }
}
