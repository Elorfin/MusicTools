<?php

namespace BadgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\UniqueIdentifierTrait;

/**
 * BadgeDefinition
 *
 * @ORM\Table(name="badge_definition")
 * @ORM\Entity
 */
class BadgeDefinition extends AbstractBadge
{
    /**
     * ID
     */
    use UniqueIdentifierTrait;
}
