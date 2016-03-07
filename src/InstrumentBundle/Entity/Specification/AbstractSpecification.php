<?php

namespace InstrumentBundle\Entity\Specification;

use Doctrine\ORM\Mapping as ORM;
use InstrumentBundle\Entity\Instrument;

/**
 * Base class for all types of instrument
 * @ORM\MappedSuperclass()
 */
abstract class AbstractSpecification implements \JsonSerializable
{
    /**
     * General information about the Instrument
     * @var Instrument
     *
     * @ORM\OneToOne(targetEntity="InstrumentBundle\Entity\Instrument")
     * @ORM\JoinColumn(name="instrument_id", referencedColumnName="id")
     */
    protected $instrument;

    /**
     * Get info
     * @return Instrument
     */
    public function getInstrument()
    {
        return $this->instrument;
    }

    /**
     * Set instrument
     * @param  Instrument $instrument
     * @return AbstractSpecification
     */
    public function setInstrument(Instrument $instrument)
    {
        $this->instrument = $instrument;

        return $this;
    }
}
