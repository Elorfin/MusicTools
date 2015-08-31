<?php

namespace MusicTools\MusicianBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * MusicianFriendship Entity
 * Used to store the configuration of a friendship between two Musicians
 *
 * @ORM\Entity()
 * @ORM\Table(name="musician_friendship")
 */
class MusicianFriendship
{
    const STATUS_PENDING  = 0;
    const STATUS_ACCEPTED = 1;
    const STATUS_REJECTED = 0;

    /**
     * Unique identifier of the MusicianFriendship
     * @var integer
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * First member of the friendship link
     * @var \MusicTools\MusicianBundle\Entity\Musician
     *
     * @ORM\ManyToOne(targetEntity="MusicTools\MusicianBundle\Entity\Musician")
     * @ORM\JoinColumn(name="musician_one_id", referencedColumnName="id")
     */
    protected $musicianOne;

    /**
     * Second member of the friendship link
     * @var \MusicTools\MusicianBundle\Entity\Musician
     *
     * @ORM\ManyToOne(targetEntity="MusicTools\MusicianBundle\Entity\Musician")
     * @ORM\JoinColumn(name="musician_two_id", referencedColumnName="id")
     */
    protected $musicianTwo;

    /**
     * Status of the Friendship
     * @var integer
     *
     * @ORM\Column(name="friendship_status", type="integer")
     */
    protected $status = self::STATUS_PENDING;

    /**
     * Who has make the request (to know which Musician must validate the request)
     * @var \MusicTools\MusicianBundle\Entity\Musician
     *
     * @ORM\ManyToOne(targetEntity="MusicTools\MusicianBundle\Entity\Musician")
     * @ORM\JoinColumn(name="requested_by_id", referencedColumnName="id")
     */
    protected $requestedBy;

    /**
     * Get the first member of the friendship link
     * @return \MusicTools\MusicianBundle\Entity\Musician
     */
    public function getMusicianOne()
    {
        return $this->musicianOne;
    }

    /**
     * Set the first member of the friendship link
     * @param  \MusicTools\MusicianBundle\Entity\Musician $musician
     * @return \MusicTools\MusicianBundle\Entity\MusicianFriendship
     */
    public function setMusicianOne(Musician $musician)
    {
        $this->musicianOne = $musician;

        return $this;
    }

    /**
     * Get the second member of the friendship link
     * @return \MusicTools\MusicianBundle\Entity\Musician
     */
    public function getMusicianTwo()
    {
        return $this->musicianTwo;
    }

    /**
     * Set the second member of the friendship link
     * @param  \MusicTools\MusicianBundle\Entity\Musician $musician
     * @return \MusicTools\MusicianBundle\Entity\MusicianFriendship
     */
    public function setMusicianTwo(Musician $musician)
    {
        $this->musicianTwo = $musician;

        return $this;
    }

    /**
     * Get status
     * @return integer
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set status
     * @param  integer $status
     * @return \MusicTools\MusicianBundle\Entity\MusicianFriendship
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get requested by
     * @return \MusicTools\MusicianBundle\Entity\Musician
     */
    public function getRequestedBy()
    {
        return $this->requestedBy;
    }

    /**
     * Set requested by
     * @param \MusicTools\MusicianBundle\Entity\Musician $requestedBy
     * @return \MusicTools\MusicianBundle\Entity\MusicianFriendship
     */
    public function setRequestedBy(Musician $requestedBy)
    {
        $this->requestedBy = $requestedBy;

        return $this;
    }
}