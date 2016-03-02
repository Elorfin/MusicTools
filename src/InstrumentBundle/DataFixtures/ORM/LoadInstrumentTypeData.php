<?php

namespace InstrumentBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use InstrumentBundle\Entity\InstrumentType;

/**
 * Initializes instrument types
 */
class LoadInstrumentTypeData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 1;
    }

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $types = array (
            array (
                'name'   => 'Guitar',
                'icon'   => 'instrument/guitar.svg',
                'prefix' => 'Guitar',
            ),

            array (
                'name'   => 'Ukulele',
                'icon'   => 'instrument/ukulele.svg',
                'prefix' => 'Guitar',
            ),

            array (
                'name'   => 'Bass',
                'icon'   => 'instrument/bass.svg',
                'prefix' => 'Guitar',
            ),

            array (
                'name'   => 'Flute',
                'icon'   => 'instrument/flute.svg',
                'prefix' => 'Flute',
            ),

            array (
                'name'   => 'Piano',
                'icon'   => 'instrument/piano.svg',
                'prefix' => 'Piano',
            ),
        );

        foreach ($types as $type) {
            $entity = new InstrumentType();

            $entity->setName($type['name']);
            $entity->setIcon($type['icon']);
            $entity->setPrefix($type['prefix']);

            $manager->persist($entity);

            // Store reference for use in other DataFixtures
            $name = strtolower($type['name']);
            $this->addReference($name, $entity);
        }

        $manager->flush();
    }
}