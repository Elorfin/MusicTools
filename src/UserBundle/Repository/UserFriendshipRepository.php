<?php

namespace UserBundle\Repository;

use Doctrine\ORM\EntityRepository;
use UserBundle\Entity\User;

/**
 * Fetches UserFriendship data from DB
 */
class UserFriendshipRepository extends EntityRepository
{
    public function findFriends(User $musician)
    {

    }

    public function findPendingRequests(User $musician)
    {

    }

    public function findRejectedRequests(User $musician)
    {

    }
}
