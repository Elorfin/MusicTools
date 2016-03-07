<?php

namespace InstrumentBundle\Entity\Specification;

use Doctrine\ORM\Mapping as ORM;
use InstrumentBundle\Entity\Instrument\GuitarTrait;

/**
 * Guitar Entity
 * Used to store the configuration of a Guitar
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_guitar")
 */
class GuitarSpecification extends AbstractSpecification
{
    /**
     * Unique identifier of the Guitar
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
     * Ge id
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    public function jsonSerialize()
    {
        return [
            'type' => 'instrument_specifications',
            'id'   => $this->id,
            'attributes'  => [
                'leftHanded'    => $this->leftHanded,
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
