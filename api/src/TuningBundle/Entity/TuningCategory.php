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
    /**
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * Name
     */
    use NameTrait;

    /**
     * Type of the Instrument.
     *
     * @var InstrumentType
     *
     * @ORM\ManyToOne(targetEntity="InstrumentBundle\Entity\InstrumentType")
     * @ORM\JoinColumn(name="type_id", referencedColumnName="id")
     */
    protected $instrumentType;

    /**
     * Get type of the Instrument.
     *
     * @return InstrumentType
     */
    public function getInstrumentType()
    {
        return $this->instrumentType;
    }

    /**
     * Set type of the Instrument.
     *
     * @param InstrumentType $instrumentType
     *
     * @return TuningCategory
     */
    public function setInstrumentType(InstrumentType $instrumentType)
    {
        $this->instrumentType = $instrumentType;

        return $this;
    }

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
