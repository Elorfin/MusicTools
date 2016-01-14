<?php

namespace InstrumentBundle\Entity\Specification;

use Doctrine\ORM\Mapping as ORM;
use InstrumentBundle\Entity\Instrument;

/**
 * Base class for all types of instrument
 * @ORM\MappedSuperclass()
 */
abstract class AbstractSpecification
{
    /**
     * General information about the Instrument
     * @var Instrument
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
