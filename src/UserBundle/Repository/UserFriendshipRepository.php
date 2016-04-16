<?php

namespace UserBundle\Repository;

use Doctrine\ORM\EntityRepository;
use UserBundle\Entity\User;

/**
 * Fetches UserFriendship data from DB
 */
class UserFriendshipRepository extends EntityRepository
{
    public function findFriends(User $user)
    {

    }

    public function findPendingRequests(User $user)
    {

    }

    public function findRejectedRequests(User $user)
    {

    }
}
