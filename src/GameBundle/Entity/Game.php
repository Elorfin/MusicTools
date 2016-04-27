<?php

namespace GameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\NameTrait;
use CommonBundle\Model\DescriptionTrait;
use CommonBundle\Model\UniqueIdentifierTrait;

/**
 * Game Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="game")
 */
class Game implements \JsonSerializable
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
     * Description
     */
    use DescriptionTrait;

    /**
     * Serializes the Entity
     * @return array
     */
    public function jsonSerialize()
    {
        return array(
            'type' => 'games',
            'id'   => $this->id,
            'attributes' => array(
                'name'        => $this->name,
                'description' => $this->description,
            )
        );
    }
}
