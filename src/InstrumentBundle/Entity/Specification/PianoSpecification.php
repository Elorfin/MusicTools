<?php

namespace InstrumentBundle\Entity\Specification;

use CommonBundle\Model\UniqueIdentifierTrait;
use Doctrine\ORM\Mapping as ORM;

/**
 * Piano Entity
 * Used to store the configuration of a Piano.
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_piano")
 */
class PianoSpecification extends AbstractSpecification
{
    /*
     * ID
     */
    use UniqueIdentifierTrait;

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

            ],
        ];
    }
}
