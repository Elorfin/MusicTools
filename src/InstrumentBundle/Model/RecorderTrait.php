<?php

namespace InstrumentBundle\Model;

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

    /**
     * Get range
     * @return string
     */
    public function getRange()
    {
        return $this->range;
    }

    /**
     * Set range
     * @param  string $range
     * @return $this
     */
    public function setRange($range)
    {
        $this->range = $range;

        return $this;
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
