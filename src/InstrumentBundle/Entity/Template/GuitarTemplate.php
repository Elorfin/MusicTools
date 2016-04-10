<?php

namespace InstrumentBundle\Entity\Template;

use CommonBundle\Model\UniqueIdentifierTrait;
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
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * Guitar fields
     */
    use GuitarTrait;

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
