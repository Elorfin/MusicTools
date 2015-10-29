<?php

namespace MusicTools\TheoryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use Elorfin\ReactorBundle\Entity\NameableTrait;

/**
 * Degree Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="theory_degree")
 */
class Degree
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Add Nameable behavior
     */
    use NameableTrait;
}
