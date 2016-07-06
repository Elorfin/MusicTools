<?php

namespace InstrumentBundle\Entity\Specification;

use CommonBundle\Model\UniqueIdentifierTrait;
use Doctrine\ORM\Mapping as ORM;

/**
 * Recorder Entity
 * Used to store the configuration of a Recorder.
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_recorder")
 */
class RecorderSpecification extends AbstractSpecification
{
    /**
     * ID
     */
    use UniqueIdentifierTrait;

    protected $range;

    /**
     * Type of the fingering.
     *
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $fingering;

    /**
     * Get range.
     *
     * @return string
     */
    public function getRange()
    {
        return $this->range;
    }

    /**
     * Set range.
     *
     * @param string $range
     *
     * @return $this
     */
    public function setRange($range)
    {
        $this->range = $range;

        return $this;
    }

    /**
     * Get fingering.
     *
     * @return string
     */
    public function getFingering()
    {
        return $this->fingering;
    }

    /**
     * Set fingering.
     *
     * @param string $fingering
     *
     * @return $this
     */
    public function setFingering($fingering)
    {
        $this->fingering = $fingering;

        return $this;
    }

    /**
     * Serialize the Entity.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            'type' => 'instrument_specifications',
            'id' => $this->id,
            'attributes' => [
                'range' => $this->range,
                'fingering' => $this->fingering,
            ],
        ];
    }
}
