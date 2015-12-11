<?php

namespace MusicTools\InstrumentBundle\Entity\Template;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use MusicTools\InstrumentBundle\Entity\Instrument\GuitarTrait;

/**
 * Template for Guitars
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_template_guitar")
 */
class GuitarTemplate extends AbstractTemplate
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