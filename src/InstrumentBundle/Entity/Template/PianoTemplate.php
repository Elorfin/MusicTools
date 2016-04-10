<?php

namespace InstrumentBundle\Entity\Template;

use CommonBundle\Model\UniqueIdentifierTrait;
use Doctrine\ORM\Mapping as ORM;
use InstrumentBundle\Model\PianoTrait;

/**
 * Template for Pianos
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_template_piano")
 */
class PianoTemplate extends AbstractTemplate
{
    /**
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * Piano fields
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
