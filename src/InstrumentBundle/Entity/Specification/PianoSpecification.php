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
     * Unique identifier of the Game
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * Add Piano behavior
     */
    use PianoTrait;

    /**
     * Get id
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }
}
