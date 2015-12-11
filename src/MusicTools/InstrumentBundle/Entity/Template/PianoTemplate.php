<?php

namespace MusicTools\InstrumentBundle\Entity\Template;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use MusicTools\InstrumentBundle\Entity\Instrument\PianoTrait;

/**
 * Template for Pianos
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_template_piano")
 */
class PianoTemplate extends AbstractTemplate
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