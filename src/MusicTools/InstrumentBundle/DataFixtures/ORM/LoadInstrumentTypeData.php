<?php

namespace MusicTools\InstrumentBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use MusicTools\InstrumentBundle\Entity\InstrumentType;

/**
 * Initializes instrument types
 */
class LoadInstrumentTypeData implements FixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $types = array (
            array (
                'name'    => 'Electric Guitar',
                'strings' => 6,
                'frets'   => 24
            ),

            array (
                'name'    => 'Acoustic Guitar',
                'strings' => 6,
                'frets'   => 19
            ),

            array (
                'name'    => 'Bass',
                'strings' => 4,
                'frets'   => 24
            ),

            array (
                'name'    => 'Soprano Ukulele',
                'strings' => 4,
                'frets'   => 12
            ),
        );

        foreach ($types as $type) {
            $typeEntity = new InstrumentType();

            $typeEntity->setName($type['name']);
            $typeEntity->setStrings($type['strings']);
            $typeEntity->setFrets($type['frets']);

            $manager->persist($typeEntity);
        }

        $manager->flush();
    }
}