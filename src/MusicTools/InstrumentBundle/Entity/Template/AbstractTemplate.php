<?php

namespace MusicTools\InstrumentBundle\Entity\Template;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Exclude as SerializerExclude;
use Elorfin\ReactorBundle\Entity\NameableTrait;
use MusicTools\InstrumentBundle\Entity\InstrumentType;

/**
 * Base class for instrument templates
 * @ORM\MappedSuperclass()
 */
abstract class AbstractTemplate
{
    /**
     * Add nameable behavior
     */
    use NameableTrait;

    /**
     * @var \MusicTools\InstrumentBundle\Entity\InstrumentType
     *
     * @ORM\ManyToOne(targetEntity="MusicTools\InstrumentBundle\Entity\InstrumentType")
     * @ORM\JoinColumn(name="type_id", referencedColumnName="id", nullable=false)
     *
     * @SerializerExclude
     */
    protected $type;

    /**+
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
     * @return \MusicTools\InstrumentBundle\Entity\Template\AbstractTemplate
     */
    public function setType(InstrumentType $type)
    {
        $this->type = $type;

        return $this;
    }
}