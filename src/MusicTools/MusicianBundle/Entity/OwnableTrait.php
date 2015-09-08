<?php

namespace MusicTools\MusicianBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Add Ownable behavior to Entity
 */
trait OwnableTrait
{
    /**
     * Musician owner
     * @var \MusicTools\MusicianBundle\Entity\Musician
     *
     * @ORM\ManyToOne(targetEntity="MusicTools\MusicianBundle\Entity\Musician")
     * @ORM\JoinColumn(name="owner_id", referencedColumnName="id")
     */
    protected $owner;

    /**
     * Get owner
     * @return \MusicTools\MusicianBundle\Entity\Musician
     */
    public function getOwner()
    {
        return $this->owner;
    }

    /**
     * Set owner
     * @param  \MusicTools\MusicianBundle\Entity\Musician $owner
     * @return $this
     */
    public function setOwner(Musician $owner)
    {
        $this->owner = $owner;

        return $this;
    }
}