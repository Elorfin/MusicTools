<?php

namespace InstrumentBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use InstrumentBundle\Entity\Specification\AbstractSpecification;
use CommonBundle\Model\DefaultTrait;
use CommonBundle\Model\FavouriteTrait;
use CommonBundle\Model\NameTrait;
use CommonBundle\Model\UniqueIdentifierTrait;
use UserBundle\Model\OwnerTrait;

/**
 * Instrument Entity
 * Used to store the common configuration of all types of instrument
 *
 * @ORM\Entity()
 * @ORM\EntityListeners({"\InstrumentBundle\Listener\InstrumentListener"})
 * @ORM\Table(name="instrument")
 */
class Instrument implements \JsonSerializable
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
     * Is the default User instrument ?
     */
    use DefaultTrait;

    /**
     * Favourite
     */
    use FavouriteTrait;

    /**
     * Owner
     */
    use OwnerTrait;

    /**
     * Type of the Instrument
     * @var InstrumentType
     *
     * @ORM\ManyToOne(targetEntity="InstrumentBundle\Entity\InstrumentType")
     * @ORM\JoinColumn(name="type_id", referencedColumnName="id", nullable=false)
     */
    protected $instrumentType;

    /**
     * Specification of the Instrument
     * @var AbstractSpecification
     */
    protected $specification;

    /**
     * Manufacturer of the Guitar
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     */
    protected $manufacturer;

    /**
     * Model of the Guitar
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     */
    protected $model;

    /**
     * Get type of the Instrument
     * @return InstrumentType
     */
    public function getInstrumentType()
    {
        return $this->instrumentType;
    }

    /**
     * Set type of the Instrument
     * @param InstrumentType $instrumentType
     * @return Instrument
     */
    public function setInstrumentType(InstrumentType $instrumentType)
    {
        $this->instrumentType = $instrumentType;

        return $this;
    }

    /**
     * Get specification
     * @return AbstractSpecification
     */
    public function getSpecification()
    {
        return $this->specification;
    }

    /**
     * Set specification
     * @param AbstractSpecification $specification
     * @return Instrument
     */
    public function setSpecification(AbstractSpecification $specification)
    {
        $this->specification = $specification;

        // Set inverse side of relationship
        $specification->setInstrument($this);

        return $this;
    }

    /**
     * Get manufacturer
     * @return string
     */
    public function getManufacturer()
    {
        return $this->manufacturer;
    }

    /**
     * Set manufacturer
     * @param string $manufacturer
     * @return Instrument
     */
    public function setManufacturer($manufacturer)
    {
        $this->manufacturer = $manufacturer;

        return $this;
    }

    /**
     * Get model
     * @return string
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * Set model
     * @param string $model
     * @return Instrument
     */
    public function setModel($model)
    {
        $this->model = $model;

        return $this;
    }

    public function jsonSerialize()
    {
        return [
            // Identifier of the Resource
            'type' => 'instruments',
            'id'   => $this->id,

            // Attributes of the Resource
            'attributes'    => [
                'name'         => $this->name,
                'default'      => $this->default,
                'favourite'    => $this->favourite,
                'manufacturer' => $this->manufacturer,
                'model'        => $this->model,
            ],

            // Relationships with other Resources
            'relationships' => [
                'instrumentType' => [
                    'data' => $this->instrumentType,
                ],
                'specification' => [
                    'data' => $this->specification,
                ]
            ],
        ];
    }
}
