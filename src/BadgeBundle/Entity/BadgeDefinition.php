<?php

namespace BadgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * BadgeDefinition
 *
 * @ORM\Table(name="badge_definition")
 * @ORM\Entity
 */
class BadgeDefinition extends AbstractBadge
{
    /**
     * Unique identifier of the BadgeDefinition
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * Get id
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }
}
