<?php

namespace MusicTools\InstrumentBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use MusicTools\InstrumentBundle\Entity\InstrumentType;

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
                'name'     => 'Guitar',
                'icon'     => 'instrument/guitar.svg',
                'class'    => '\\MusicTools\\InstrumentBundle\\Entity\\Specification\\GuitarSpecification',
                'template' => '\\MusicTools\\InstrumentBundle\\Entity\\Template\\GuitarTemplate',
            ),

            array (
                'name'     => 'Ukulele',
                'icon'     => 'instrument/ukulele.svg',
                'class'    => '\\MusicTools\\InstrumentBundle\\Entity\\Specification\\GuitarSpecification',
                'template' => '\\MusicTools\\InstrumentBundle\\Entity\\Template\\GuitarTemplate',
            ),

            array (
                'name'     => 'Bass',
                'icon'     => 'instrument/bass.svg',
                'class'    => '\\MusicTools\\InstrumentBundle\\Entity\\Specification\\GuitarSpecification',
                'template' => '\\MusicTools\\InstrumentBundle\\Entity\\Template\\GuitarTemplate',
            ),

            array (
                'name'     => 'Flute',
                'icon'     => 'instrument/flute.svg',
                'class'    => '\\MusicTools\\InstrumentBundle\\Entity\\Specification\\FluteSpecification',
                'template' => '\\MusicTools\\InstrumentBundle\\Entity\\Template\\FluteTemplate',
            ),

            array (
                'name'     => 'Piano',
                'icon'     => 'instrument/piano.svg',
                'class'    => '\\MusicTools\\InstrumentBundle\\Entity\\Specification\\PianoSpecification',
                'template' => '\\MusicTools\\InstrumentBundle\\Entity\\Template\\PianoTemplate',
            ),
        );

        foreach ($types as $type) {
            $entity = new InstrumentType();

            $entity->setName($type['name']);
            $entity->setIcon($type['icon']);
            $entity->setClass($type['class']);
            $entity->setTemplate($type['template']);

            $manager->persist($entity);

            // Store reference for use in other DataFixtures
            $name = strtolower($type['name']);
            $this->addReference($name, $entity);
        }

        $manager->flush();
    }
}