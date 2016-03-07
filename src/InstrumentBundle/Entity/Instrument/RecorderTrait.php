<?php

namespace InstrumentBundle\Entity\Instrument;

use Doctrine\ORM\Mapping as ORM;

/**
 * Recorder
 */
trait RecorderTrait
{
    protected $range;

    /**
     * Type of the fingering
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $fingering;

    public function getRange()
    {
        return $this->range;
    }

    public function setRange($range)
    {
        return $this->range;
    }

    /**
     * Get fingering
     * @return string
     */
    public function getFingering()
    {
        return $this->fingering;
    }

    /**
     * Set fingering
     * @param  string $fingering
     * @return $this
     */
    public function setFingering($fingering)
    {
        $this->fingering = $fingering;

        return $this;
    }
}
