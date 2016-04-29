<?php

namespace AdvertisementBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\NameTrait;
use CommonBundle\Model\DescriptionTrait;
use CommonBundle\Model\UniqueIdentifierTrait;

/**
 * Advertisement.
 *
 * @ORM\Entity()
 * @ORM\Table(name="advertisement")
 */
class Advertisement implements \JsonSerializable
{
    /*
     * ID
     */
    use UniqueIdentifierTrait;

    /*
     * Name
     */
    use NameTrait;

    /*
     * Description
     */
    use DescriptionTrait;

    /**
     * Serialize the Entity.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            // Identifier of the Resource
            'type' => 'advertisements',
            'id' => $this->id,

            // Attributes of the Resource
            'attributes' => [
                'name' => $this->name,
                'description' => $this->description,
            ],

            // Relationships with other Resources
            'relationships' => [

            ],
        ];
    }
}
