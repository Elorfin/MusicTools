<?php

namespace UserBundle\Repository;

use Doctrine\ORM\EntityRepository;
use UserBundle\Entity\User;
use UserBundle\Entity\UserFriendship;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * Fetches User data from DB
 */
class UserRepository extends EntityRepository
{
    /**
     * Find all Musician except the specified one (used to list Users without display the current User in it)
     * @param $user
     * @return array
     */
    public function findAllExceptMe(UserInterface $user)
    {
        return $this->createQueryBuilder('m')
            ->where('m.user != :user')
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * Count number of songs the Musician owns
     * @param  User $user
     * @return integer
     */
    public function countSongs(User $user)
    {
        return $this->getEntityManager()
            ->createQuery('SELECT COUNT(s) FROM SongBookBundle:Song s WHERE s.owner = :user')
            ->setParameter('user', $user)
            ->getSingleScalarResult()
        ;
    }

    /**
     * Count number of guitars the User owns
     * @param  User $user
     * @return integer
     */
    public function countGuitars(User $user)
    {
        return $this->getEntityManager()
            ->createQuery('SELECT COUNT(g) FROM InstrumentBundle:Guitar g WHERE g.owner = :user')
            ->setParameter('user', $user)
            ->getSingleScalarResult()
        ;
    }

    /**
     * Count number of friends the User have
     * @param  User $user
     * @return integer
     */
    public function countFriends(User $user)
    {
        return $this->getEntityManager()
            ->createQuery('
                SELECT COUNT(mf)
                FROM UserBundle:UserFriendship mf
                WHERE (mf.userOne = :user OR mf.userTwo = :user)
                AND   mf.status = :status
            ')
            ->setParameter('user', $user)
            ->setParameter('status', UserFriendship::STATUS_ACCEPTED)
            ->getSingleScalarResult()
        ;
    }
}
