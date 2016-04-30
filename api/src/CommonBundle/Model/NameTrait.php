<?php

namespace CommonBundle\Model;

/**
 * Add a `name` field to an Entity class.
 */
trait NameTrait
{
    /**
     * Name of the Entity.
     *
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     */
    protected $name;

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return $this
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }
}
