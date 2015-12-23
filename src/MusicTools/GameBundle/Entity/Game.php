<?php

namespace MusicTools\GameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\NameableTrait;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;

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