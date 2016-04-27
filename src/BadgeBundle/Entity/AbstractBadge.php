<?php

namespace BadgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\NameTrait;
use CommonBundle\Model\DescriptionTrait;

/**
 * AbstractBadge
 *
 * @ORM\MappedSuperclass()
 */
abstract class AbstractBadge
{
    /**
     * Name
     */
    use NameTrait;

    /**
     * Description
     */
    use DescriptionTrait;
}
