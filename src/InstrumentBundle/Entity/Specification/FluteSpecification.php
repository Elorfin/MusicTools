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
     * Unique identifier of the Flute
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * Add Flute behavior
     */
    use FluteTrait;

    /**
     * Get id
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }
}
