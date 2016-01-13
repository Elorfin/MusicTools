<?php

namespace InstrumentBundle\Entity\Template;

use Doctrine\ORM\Mapping as ORM;
use InstrumentBundle\Entity\Instrument\PianoTrait;

/**
 * Template for Pianos
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_template_piano")
 */
class PianoTemplate extends AbstractTemplate
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
