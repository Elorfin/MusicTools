<?php

namespace MusicTools\MusicianBundle\Repository;

use Doctrine\ORM\EntityRepository;
use MusicTools\MusicianBundle\Entity\Musician;

/**
 * Class MusicianRepository
 */
class MusicianRepository extends EntityRepository
{
    /**
     * Find all Musician except the specified one (used to list Users without display the current User in it)
     * @param Musician $musician
     */
    public function findAllExceptMe(Musician $musician)
    {
        return $this->createQueryBuilder('m');
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
     * Count number of guitars the Musician owns
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
}