<?php

namespace CommonBundle\Model;

/**
 * Add a `default` field to an Entity class
 */
trait DefaultTrait
{
    /**
     * Is default ?
     * @var boolean
     *
     * @ORM\Column(type="boolean", name="is_default")
     */
    protected $default = false;

    /**
     * Is default ?
     * @return boolean
     */
    public function isDefault()
    {
        return $this->default;
    }

    /**
     * Set default
     * @param  boolean $default
     * @return $this
     */
    public function setDefault($default)
    {
        $this->default = $default;

        return $this;
    }
}
