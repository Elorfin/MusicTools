<?php

namespace MusicTools\TheoryBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use MusicTools\TheoryBundle\Entity\Interval;

/**
 * Initializes Intervals
 */
class LoadIntervalData implements FixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $intervals = array (
            // perfect unison
            array (
                'name'   => 'perfect unison',
                'symbol' => 'P1',
                'value'  => 0,
            ),
            // minor second
            array (
                'name'   => 'minor second',
                'symbol' => 'm2',
                'value'  => 1,
            ),
            // major second
            array (
                'name'   => 'major second',
                'symbol' => 'M2',
                'value'  => 2,
            ),
            // minor third
            array (
                'name'   => 'minor third',
                'symbol' => 'm3',
                'value'  => 3,
            ),
            // major third
            array (
                'name'   => 'major third',
                'symbol' => 'M3',
                'value'  => 4,
            ),
            // perfect fourth
            array (
                'name'   => 'perfect fourth',
                'symbol' => 'P4',
                'value'  => 5,
            ),
            // perfect fifth
            array (
                'name'   => 'perfect fifth',
                'symbol' => 'P5',
                'value'  => 7,
            ),
            // minor sixth
            array (
                'name'   => 'minor sixth',
                'symbol' => 'm6',
                'value'  => 8,
            ),
            // major sixth
            array (
                'name'   => 'major sixth',
                'symbol' => 'M6',
                'value'  => 9,
            ),
            // minor seventh
            array (
                'name'   => 'minor seventh',
                'symbol' => 'm7',
                'value'  => 10,
            ),
            // major seventh
            array (
                'name'   => 'major seventh',
                'symbol' => 'M7',
                'value'  => 11,
            ),
            // perfect octave
            array (
                'name'   => 'perfect octave',
                'symbol' => 'P8',
                'value'  => 12,
            ),
        );

        foreach ($intervals as $interval) {
            $entity = new Interval();
            $entity->setName($interval['name']);
            $entity->setSymbol($interval['symbol']);
            $entity->setValue($interval['value']);

            $manager->persist($entity);
        }

        // Save to DB
        $manager->flush();
    }
}