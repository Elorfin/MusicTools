<?php

namespace BadgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

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
     * Unique identifier of the BadgeInstance
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * Owner
     */
    use OwnerTrait;

    /**
     * Get id
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }
}
