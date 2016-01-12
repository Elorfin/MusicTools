<?php

namespace InstrumentBundle\Entity\Specification;

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
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Add Piano behavior
     */
    use PianoTrait;
}
