<?php

namespace UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\UniqueIdentifierTrait;

/**
 * UserFriendship Entity
 * Used to store the configuration of a friendship between two Users.
 *
 * @ORM\Entity()
 * @ORM\Table(name="user_friendship")
 */
class UserFriendship
{
    /**
     * Flag for the friendship requests that have not yet been accepted by `toUser`.
     */
    const STATUS_PENDING = 0;

    /**
     * Flag for the friendship requests that been accepted by `toUser`.
     */
    const STATUS_ACCEPTED = 1;

    /**
     * Flag for the friendship requests that have not yet been rejected by `toUser`.
     */
    const STATUS_REJECTED = 2;

    /*
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * First member of the friendship link.
     *
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="UserBundle\Entity\User")
     * @ORM\JoinColumn(name="from_user_id", referencedColumnName="id")
     */
    protected $fromUser;

    /**
     * Second member of the friendship link.
     *
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="UserBundle\Entity\User")
     * @ORM\JoinColumn(name="to_user_id", referencedColumnName="id")
     */
    protected $toUser;

    /**
     * Status of the Friendship.
     *
     * @var int
     *
     * @ORM\Column(name="friendship_status", type="integer")
     */
    protected $status = self::STATUS_PENDING;

    /**
     * Get the User which has initiated the friendship.
     *
     * @return User
     */
    public function getFromUser()
    {
        return $this->fromUser;
    }

    /**
     * Set the User which has initiated the friendship.
     *
     * @param User $user
     *
     * @return $this
     */
    public function setFromUser(User $user)
    {
        $this->fromUser = $user;

        return $this;
    }

    /**
     * Get the User which has received the friendship.
     *
     * @return User
     */
    public function getToUser()
    {
        return $this->toUser;
    }

    /**
     * Set the User which has received the friendship.
     *
     * @param User $user
     *
     * @return $this
     */
    public function setToUser(User $user)
    {
        $this->toUser = $user;

        return $this;
    }

    /**
     * Get status.
     *
     * @return int
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set status.
     *
     * @param int $status
     *
     * @return $this
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }
}
