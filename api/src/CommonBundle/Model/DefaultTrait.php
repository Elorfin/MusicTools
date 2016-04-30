<?php

namespace CommonBundle\Model;

/**
 * Add a `default` field to an Entity class.
 */
trait DefaultTrait
{
    /**
     * Is default ?
     *
     * @var bool
     *
     * @ORM\Column(type="boolean", name="is_default")
     */
    protected $default = false;

    /**
     * Is default ?
     *
     * @return bool
     */
    public function isDefault()
    {
        return $this->default;
    }

    /**
     * Set default.
     *
     * @param bool $default
     *
     * @return $this
     */
    public function setDefault($default)
    {
        $this->default = $default;

        return $this;
    }
}
