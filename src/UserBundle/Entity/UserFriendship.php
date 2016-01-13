<?php

namespace UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UserFriendship Entity
 * Used to store the configuration of a friendship between two Users
 *
 * @ORM\Entity()
 * @ORM\Table(name="user_friendship")
 */
class UserFriendship
{
    const STATUS_PENDING  = 0;
    const STATUS_ACCEPTED = 1;
    const STATUS_REJECTED = 0;

    /**
     * Unique identifier of the UserFriendship
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * First member of the friendship link
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="UserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_one_id", referencedColumnName="id")
     */
    protected $userOne;

    /**
     * Second member of the friendship link
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="UserBundle\Entity\User")
     * @ORM\JoinColumn(name="user_two_id", referencedColumnName="id")
     */
    protected $userTwo;

    /**
     * Status of the Friendship
     * @var integer
     *
     * @ORM\Column(name="friendship_status", type="integer")
     */
    protected $status = self::STATUS_PENDING;

    /**
     * Who has make the request (to know which Musician must validate the request)
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="UserBundle\Entity\User")
     * @ORM\JoinColumn(name="requested_by_id", referencedColumnName="id")
     */
    protected $requestedBy;

    /**
     * Get id
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get the first member of the friendship link
     * @return User
     */
    public function getUserOne()
    {
        return $this->userOne;
    }

    /**
     * Set the first member of the friendship link
     * @param  User $user
     * @return UserFriendship
     */
    public function setUserOne(User $user)
    {
        $this->userOne = $user;

        return $this;
    }

    /**
     * Get the second member of the friendship link
     * @return User
     */
    public function getUserTwo()
    {
        return $this->userTwo;
    }

    /**
     * Set the second member of the friendship link
     * @param  User $user
     * @return UserFriendship
     */
    public function setUserTwo(User $user)
    {
        $this->userTwo = $user;

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
     * @return UserFriendship
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get requested by
     * @return User
     */
    public function getRequestedBy()
    {
        return $this->requestedBy;
    }

    /**
     * Set requested by
     * @param  User $requestedBy
     * @return UserFriendship
     */
    public function setRequestedBy(User $requestedBy)
    {
        $this->requestedBy = $requestedBy;

        return $this;
    }
}
