<?php

namespace InstrumentBundle\Entity\Template;

use Doctrine\ORM\Mapping as ORM;
use InstrumentBundle\Entity\Instrument\FluteTrait;

/**
 * Template for Flutes
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_template_flute")
 */
class FluteTemplate extends AbstractTemplate
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