<?php

namespace InstrumentBundle\Entity\Template;

use CommonBundle\Model\UniqueIdentifierTrait;
use Doctrine\ORM\Mapping as ORM;
use InstrumentBundle\Entity\Instrument\RecorderTrait;

/**
 * Template for Recorders
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_template_recorder")
 */
class RecorderTemplate extends AbstractTemplate
{
    /**
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * Recorder fields
     */
    use RecorderTrait;

    public function jsonSerialize()
    {
        return [
            'type' => 'instrument_templates',
            'id'   => $this->id,
            'attributes'  => [
                'name'    => $this->name,
            ]
        ];
    }
}
