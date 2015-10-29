<?php

namespace MusicTools\MusicianBundle\Repository;

use Doctrine\ORM\EntityRepository;
use MusicTools\MusicianBundle\Entity\Musician;
use MusicTools\MusicianBundle\Entity\MusicianFriendship;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * Fetches Musician data from DB
 */
class MusicianRepository extends EntityRepository
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
     * @param  \MusicTools\MusicianBundle\Entity\Musician $musician
     * @return integer
     */
    public function countSongs(Musician $musician)
    {
        return $this->getEntityManager()
            ->createQuery('SELECT COUNT(s) FROM MusicToolsSongBookBundle:Song s WHERE s.owner = :musician')
            ->setParameter('musician', $musician)
            ->getSingleScalarResult()
        ;
    }

    /**
     * Count number of guitars the Musician own
     * @param  \MusicTools\MusicianBundle\Entity\Musician $musician
     * @return integer
     */
    public function countGuitars(Musician $musician)
    {
        return $this->getEntityManager()
            ->createQuery('SELECT COUNT(g) FROM MusicToolsInstrumentBundle:Guitar g WHERE g.owner = :musician')
            ->setParameter('musician', $musician)
            ->getSingleScalarResult()
        ;
    }

    /**
     * Count number of friends the Musician have
     * @param  \MusicTools\MusicianBundle\Entity\Musician $musician
     * @return integer
     */
    public function countFriends(Musician $musician)
    {
        return $this->getEntityManager()
            ->createQuery('
                SELECT COUNT(mf)
                FROM MusicToolsMusicianBundle:MusicianFriendship mf
                WHERE (mf.musicianOne = :musician OR mf.musicianOne = :musician)
                AND   mf.status = :status
            ')
            ->setParameter('musician', $musician)
            ->setParameter('status', MusicianFriendship::STATUS_ACCEPTED)
            ->getSingleScalarResult()
        ;
    }
}