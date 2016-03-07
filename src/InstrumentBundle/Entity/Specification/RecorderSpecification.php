<?php

namespace InstrumentBundle\Entity\Specification;

use Doctrine\ORM\Mapping as ORM;
use InstrumentBundle\Entity\Instrument\RecorderTrait;

/**
 * Recorder Entity
 * Used to store the configuration of a Recorder
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_recorder")
 */
class RecorderSpecification extends AbstractSpecification
{
    /**
     * Unique identifier of the Recorder
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * Add Recorder behavior
     */
    use RecorderTrait;

    /**
     * Get id
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    public function jsonSerialize()
    {
        return [
            'type' => 'instrument_specifications',
            'id'   => $this->id,
            'attributes'  => [
                'range'     => $this->range,
                'fingering' => $this->fingering,
            ]
        ];
    }
}
