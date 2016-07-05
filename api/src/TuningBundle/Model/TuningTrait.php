<?php

namespace TuningBundle\Model;

use TuningBundle\Entity\Tuning;

/**
 * Add a `tuning` field to an Entity class.
 */
trait TuningTrait
{
    /**
     * Tuning.
     *
     * @var Tuning
     *
     * @ORM\ManyToOne(targetEntity="TuningBundle\Entity\Tuning")
     * @ORM\JoinColumn(name="tuning_id", referencedColumnName="id")
     */
    protected $tuning;

    /**
     * Get tuning.
     *
     * @return Tuning
     */
    public function getTuning()
    {
        return $this->tuning;
    }

    /**
     * Set tuning.
     *
     * @param Tuning $tuning
     *
     * @return $this
     */
    public function setTuning(Tuning $tuning)
    {
        $this->tuning = $tuning;

        return $this;
    }
}
