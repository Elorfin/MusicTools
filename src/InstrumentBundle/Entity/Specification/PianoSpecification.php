<?php

namespace InstrumentBundle\Entity\Specification;

use CommonBundle\Model\UniqueIdentifierTrait;
use Doctrine\ORM\Mapping as ORM;
use InstrumentBundle\Entity\Instrument\PianoTrait;

/**
 * Piano Entity
 * Used to store the configuration of a Piano
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_piano")
 */
class PianoSpecification extends AbstractSpecification
{
    /**
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * Piano fields
     */
    use PianoTrait;

    public function jsonSerialize()
    {
        return [
            'type' => 'instrument_specifications',
            'id'   => $this->id,
            'attributes'  => [

            ]
        ];
    }
}
