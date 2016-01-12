<?php

namespace InstrumentBundle\Entity\Specification;

use Doctrine\ORM\Mapping as ORM;
use InstrumentBundle\Entity\Instrument\FluteTrait;

/**
 * Flute Entity
 * Used to store the configuration of a Flute
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_flute")
 */
class FluteSpecification extends AbstractSpecification
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Add Flute behavior
     */
    use FluteTrait;
}
