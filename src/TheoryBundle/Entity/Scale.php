<?php

namespace TheoryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\UniqueIdentifierTrait;
use CommonBundle\Model\NameTrait;

/**
 * Scale Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="theory_scale")
 */
class Scale implements \JsonSerializable
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
     * Serialize the Entity
     * @return array
     */
    public function jsonSerialize()
    {
        return array (
            'type' => 'scales',
            'id'   => $this->id,
            'attributes'  => array (
                'name'    => $this->name,
            )
        );
    }
}
