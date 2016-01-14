<?php

namespace UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Add Ownable behavior to Entity
 */
trait OwnableTrait
{
    /**
     * User owner
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="UserBundle\Entity\User")
     * @ORM\JoinColumn(name="owner_id", referencedColumnName="id")
     */
    protected $owner;

    /**
     * Get owner
     * @return User
     */
    public function getOwner()
    {
        return $this->owner;
    }

    /**
     * Set owner
     * @param  User $owner
     * @return $this
     */
    public function setOwner(User $owner)
    {
        $this->owner = $owner;

        return $this;
    }
}
