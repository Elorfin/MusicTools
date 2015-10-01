<?php

namespace MusicTools\InstrumentBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\NameableTrait;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;

/**
 * InstrumentType Entity
 * Stores the default configuration for each instrument type (e.g. guitar 6 strings, guitar 7 strings, bass)
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_type")
 */
class InstrumentType extends AbstractStringInstrument
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Add Nameable behavior
     */
    use NameableTrait;

    protected $icon;

    /**
     * Tuning of the Instrument
     * @var
     */
    protected $tuning;
}