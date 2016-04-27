<?php

namespace BadgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\UniqueIdentifierTrait;
use UserBundle\Model\OwnerTrait;

/**
 * BadgeInstance
 *
 * @ORM\Table(name="badge_instance")
 * @ORM\Entity
 */
class BadgeInstance extends AbstractBadge
{
    /**
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * Owner
     */
    use OwnerTrait;
}
