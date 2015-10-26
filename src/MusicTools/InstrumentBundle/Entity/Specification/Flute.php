<?php

namespace MusicTools\InstrumentBundle\Entity\Specification;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;

/**
 * Flute Entity
 * Used to store the configuration of a Flute
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_flute")
 */
class Flute extends AbstractSpecification implements \JsonSerializable
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Serialize the Entity
     * @return array
     */
    public function jsonSerialize()
    {
        return array (

        );
    }
}
