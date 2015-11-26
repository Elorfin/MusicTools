<?php

namespace MusicTools\TheoryBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use MusicTools\TheoryBundle\Entity\Chord;

/**
 * Initializes chords
 */
class LoadChordData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 2;
    }

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        // List of Chords to insert into the DB
        $chords = array (
            array( 'notesCount' => 3, 'name' => 'major',      'symbol' => '',  'intervals' => array( 'M3', 'P5' ) ),
            array( 'notesCount' => 3, 'name' => 'minor',      'symbol' => 'm', 'intervals' => array( 'm3', 'P5' ) ),
            array( 'notesCount' => 3, 'name' => 'diminished', 'symbol' => '°', 'intervals' => array( 'm3', 'd5' ) ),
            array( 'notesCount' => 3, 'name' => 'augmented',  'symbol' => '+', 'intervals' => array( 'M3', 'A5' ) ),
        );

        foreach ($chords as $chord) {
            $entity = new Chord();

            $entity->setName($chord['name']);
            $entity->setSymbol($chord['symbol']);
            $entity->setNotesCount($chord['notesCount']);

            // Get the Intervals of the Chord
            foreach ($chord['intervals'] as $interval) {
                /** @var \MusicTools\TheoryBundle\Entity\Interval $intervalEntity */
                $intervalEntity = $this->getReference('interval-' . $interval);
                $entity->addInterval($intervalEntity);
            }

            $manager->persist($entity);
        }

        // Save to DB
        $manager->flush();
    }
}