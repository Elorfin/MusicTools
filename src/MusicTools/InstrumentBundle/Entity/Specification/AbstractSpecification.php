<?php

namespace MusicTools\InstrumentBundle\Entity\Specification;

use Doctrine\ORM\Mapping as ORM;
use MusicTools\InstrumentBundle\Entity\Instrument;

/**
 * Base class for all types of instrument
 * @ORM\MappedSuperclass()
 */
abstract class AbstractSpecification
{
    /**
     * General information about the Instrument
     * @var \MusicTools\InstrumentBundle\Entity\Instrument
     */
    protected $instrument;

    /**
     * Get info
     * @return \MusicTools\InstrumentBundle\Entity\Instrument
     */
    public function getInstrument()
    {
        return $this->instrument;
    }

    /**
     * Set info
     * @param \MusicTools\InstrumentBundle\Entity\Instrument $instrument
     * @return \MusicTools\InstrumentBundle\Entity\Specification\AbstractSpecification
     */
    public function setInfo(Instrument $instrument)
    {
        $this->instrument = $instrument;

        return $this;
    }
}