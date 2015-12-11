<?php

namespace MusicTools\InstrumentBundle\Entity\Specification;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use MusicTools\InstrumentBundle\Entity\Instrument\GuitarTrait;

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
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Add Guitar behavior
     */
    use GuitarTrait;
}
