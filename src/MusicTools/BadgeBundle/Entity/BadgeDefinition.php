<?php

namespace MusicTools\BadgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;

/**
 * BadgeDefinition
 *
 * @ORM\Table(name="badge_definition")
 * @ORM\Entity
 */
class BadgeDefinition extends AbstractBadge
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;
}