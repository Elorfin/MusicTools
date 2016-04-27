<?php

namespace UserBundle\Repository;

use Doctrine\ORM\EntityRepository;
use UserBundle\Entity\User;
use UserBundle\Entity\UserFriendship;

/**
 * Fetches UserFriendship data from DB
 */
class UserFriendshipRepository extends EntityRepository
{
    /**
     * @param  User $user
     * @return array
     */
    public function findFriends(User $user)
    {
        $builder = $this->createQueryBuilder('uf');

        $builder->where('uf.status = :status');
        $builder->andWhere('uf.fromUser = :user OR uf.toUser = :user');
        $builder->setParameter('status', UserFriendship::STATUS_ACCEPTED);
        $builder->setParameter('user', $user);

        return $builder->getQuery()->getResult();
    }

    /**
     * @param  User $user
     * @return array
     */
    public function findPendingSentRequests(User $user)
    {
        return $this->findBy([
            'fromUser' => $user,
            'status'   => UserFriendship::STATUS_PENDING
        ]);
    }

    /**
     * @param  User $user
     * @return array
     */
    public function findPendingReceivedRequests(User $user)
    {
        return $this->findBy([
            'toUser' => $user,
            'status'   => UserFriendship::STATUS_PENDING
        ]);
    }

    /**
     * @param  User $user
     * @return array
     */
    public function findRejectedSentRequests(User $user)
    {
        return $this->findBy([
            'fromUser' => $user,
            'status'   => UserFriendship::STATUS_REJECTED
        ]);
    }

    /**
     * @param  User $user
     * @return array
     */
    public function findRejectedReceivedRequests(User $user)
    {
        return $this->findBy([
            'toUser' => $user,
            'status'   => UserFriendship::STATUS_REJECTED
        ]);
    }
}
