<?php

namespace InstrumentBundle\Entity\Specification;

use CommonBundle\Model\UniqueIdentifierTrait;
use Doctrine\ORM\Mapping as ORM;
use InstrumentBundle\Model\GuitarTrait;

/**
 * Guitar Entity
 * Used to store the configuration of a Guitar
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_guitar")
 */
class GuitarSpecification extends AbstractSpecification
{
    /**
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * Guitar fields
     */
    use GuitarTrait;

    public function jsonSerialize()
    {
        return [
            'type' => 'instrument_specifications',
            'id'   => $this->id,
            'attributes'  => [
                'leftHanded'    => $this->leftHanded,
                'headstock'     => $this->headstock,
                'body'          => $this->body,
                'amplification' => $this->amplification,
                'strings'       => $this->strings,
                'frets'         => $this->frets,
            ],
            'relationships' => [
                'tuning' => [
                    'data' => $this->tuning
                ]
            ]
        ];
    }
}
