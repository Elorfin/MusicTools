<?php

namespace TuningBundle\Entity;

use CommonBundle\Model\NameTrait;
use CommonBundle\Model\UniqueIdentifierTrait;
use Doctrine\ORM\Mapping as ORM;
use InstrumentBundle\Entity\InstrumentType;

/**
 * Tuning Category Entity.
 *
 * @ORM\Entity()
 * @ORM\Table(name="tuning_category")
 */
class TuningCategory implements \JsonSerializable
{
    /*
     * ID
     */
    use UniqueIdentifierTrait;

    /*
     * Name
     */
    use NameTrait;

    public function jsonSerialize()
    {
        return [
            // Identifier of the Resource
            'type' => 'tuning_categories',
            'id' => $this->id,

            // Attributes of the Resource
            'attributes' => [
                'name' => $this->name,
            ],
        ];
    }
}
