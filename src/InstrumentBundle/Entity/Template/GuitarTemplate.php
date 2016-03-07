<?php

namespace InstrumentBundle\Entity\Template;

use Doctrine\ORM\Mapping as ORM;
use InstrumentBundle\Entity\Instrument\GuitarTrait;

/**
 * Template for Guitars
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_template_guitar")
 */
class GuitarTemplate extends AbstractTemplate
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
     * Add Guitar behavior
     */
    use GuitarTrait;

    /**
     * Get id
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    public function jsonSerialize()
    {
        return [
            'type' => 'instrument_templates',
            'id'   => $this->id,
            'attributes'  => [
                'name'          => $this->name,
                'headstock'     => $this->headstock,
                'body'          => $this->body,
                'amplification' => $this->amplification,
                'strings'       => $this->strings,
                'frets'         => $this->frets,
                'tuning'        => $this->tuning,
            ]
        ];
    }
}
