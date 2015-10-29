<?php

namespace MusicTools\InstrumentBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use MusicTools\InstrumentBundle\Entity\InstrumentType;

/**
 * Initializes instrument types
 */
class LoadModelData implements FixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $types = array (
            array (
                'name'  => 'Guitar',
                'icon'  => 'instrument/guitar.png',
                'class' => '\\MusicTools\\InstrumentBundle\\Entity\\Guitar',
            ),

            array (
                'name'  => 'Ukulele',
                'icon'  => 'instrument/ukulele.png',
                'class' => '\\MusicTools\\InstrumentBundle\\Entity\\Guitar',
            ),

            array (
                'name'  => 'Bass',
                'icon'  => 'instrument/bass.png',
                'class' => '\\MusicTools\\InstrumentBundle\\Entity\\Guitar',
            ),

            array (
                'name'  => 'Flute',
                'icon'  => 'instrument/flute.png',
                'class' => '\\MusicTools\\InstrumentBundle\\Entity\\Flute',
            ),

            array (
                'name'  => 'Piano',
                'icon'  => 'instrument/piano.png',
                'class' => '\\MusicTools\\InstrumentBundle\\Entity\\Piano',
            ),
        );

        foreach ($types as $type) {
            $typeEntity = new InstrumentType();

            $typeEntity->setName($type['name']);
            $typeEntity->setIcon($type['icon']);
            $typeEntity->setClass($type['class']);

            $manager->persist($typeEntity);
        }

        $manager->flush();
    }
}