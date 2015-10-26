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
class Game
{
    /**
     * Add identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Add nameable behavior
     */
    use NameableTrait;
}