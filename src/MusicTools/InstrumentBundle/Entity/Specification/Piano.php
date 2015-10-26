<?php

namespace MusicTools\InstrumentBundle\Entity\Specification;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;

/**
 * Piano Entity
 * Used to store the configuration of a Piano
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_piano")
 */
class Piano extends AbstractSpecification implements \JsonSerializable
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
