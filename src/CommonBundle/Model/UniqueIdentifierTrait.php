<?php

namespace CommonBundle\Model;

use Doctrine\ORM\Mapping as ORM;

/**
 * Add an `ìd` field to an Entity class
 */
trait UniqueIdentifierTrait
{
    /**
     * Unique identifier of the Entity
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
