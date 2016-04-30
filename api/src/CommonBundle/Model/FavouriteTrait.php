<?php

namespace CommonBundle\Model;

/**
 * Add a `favourite` field to an Entity class.
 */
trait FavouriteTrait
{
    /**
     * Is favourite ?
     *
     * @var bool
     *
     * @ORM\Column(type="boolean")
     */
    protected $favourite = false;

    /**
     * Is favourite ?
     *
     * @return bool
     */
    public function isFavourite()
    {
        return $this->favourite;
    }

    /**
     * Set favourite.
     *
     * @param bool $favourite
     *
     * @return $this
     */
    public function setFavourite($favourite)
    {
        $this->favourite = $favourite;

        return $this;
    }
}
