<?php

namespace MusicTools\MusicianBundle\Repository;

use Doctrine\ORM\EntityRepository;
use MusicTools\MusicianBundle\Entity\Musician;

/**
 * Fetches MusicianFriendship data from DB
 */
class MusicianFriendshipRepository extends EntityRepository
{
    public function findFriends(Musician $musician)
    {

    }

    public function findPendingRequests(Musician $musician)
    {

    }

    public function findRejectedRequests(Musician $musician)
    {

    }
}