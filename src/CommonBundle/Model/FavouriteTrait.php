<?php

namespace CommonBundle\Model;

use Doctrine\ORM\Mapping as ORM;

/**
 * Add a `favourite` field to an Entity class
 */
trait FavouriteTrait
{
    /**
     * Is favourite ?
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    protected $favourite = false;

    /**
     * Is favourite ?
     * @return boolean
     */
    public function isFavourite()
    {
        return $this->favourite;
    }

    /**
     * Set favourite
     * @param  boolean $favourite
     * @return $this
     */
    public function setFavourite($favourite)
    {
        $this->favourite = $favourite;

        return $this;
    }
}
