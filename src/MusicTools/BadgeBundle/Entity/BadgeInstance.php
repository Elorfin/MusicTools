<?php

namespace MusicTools\BadgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use MusicTools\MusicianBundle\Entity\OwnableTrait;

/**
 * BadgeInstance
 *
 * @ORM\Table(name="badge_instance")
 * @ORM\Entity
 */
class BadgeInstance extends AbstractBadge
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Add Ownable behavior
     */
    use OwnableTrait;
}