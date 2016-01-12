<?php

namespace GameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Game Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="game")
 */
class Game implements \JsonSerializable
{
    /**
     * Add identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Add nameable behavior
     */
    use NameableTrait;

    public function jsonSerialize()
    {
        return array(
            'type' => 'games',
            'id'   => $this->id,
            'attributes' => array(
                'name' => $this->name,
            )
        );
    }
}