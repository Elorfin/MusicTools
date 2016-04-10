<?php

namespace InstrumentBundle\Entity\Specification;

use CommonBundle\Model\UniqueIdentifierTrait;
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
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * Recorder fields
     */
    use RecorderTrait;

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
