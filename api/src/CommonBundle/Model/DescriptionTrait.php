<?php

namespace CommonBundle\Model;

/**
 * Add a `description` field to an Entity class.
 */
trait DescriptionTrait
{
    /**
     * Description of the Entity.
     *
     * @var string
     *
     * @ORM\Column(type="text", nullable=true)
     */
    protected $description;

    /**
     * Get description.
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set description.
     *
     * @param string $description
     *
     * @return $this
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }
}
