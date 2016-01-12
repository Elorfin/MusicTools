<?php

namespace TheoryBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use TheoryBundle\Entity\Degree;

/**
 * Initializes Degrees
 */
class LoadDegreeData extends AbstractFixture implements OrderedFixtureInterface
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
        // Full list of Degrees to insert into the DB
        $degrees = array (
            array( 'symbol' => 'I',    'name' => 'tonic' ),
            array( 'symbol' => 'II',   'name' => 'supertonic' ),
            array( 'symbol' => 'III',  'name' => 'mediant' ),
            array( 'symbol' => 'IV',   'name' => 'subdominant' ),
            array( 'symbol' => 'V',    'name' => 'dominant' ),
            array( 'symbol' => 'VI',   'name' => 'submediant' ),
            array( 'symbol' => 'VII',  'name' => 'leading-tone' ),
            array( 'symbol' => 'VIII', 'name' => 'octave' ),
        );

        foreach ($degrees as $degree) {
            $entity = new Degree();

            $entity->setName($degree['name']);
            $entity->setSymbol($degree['symbol']);

            $manager->persist($entity);

            // Store reference for use in other DataFixtures
            $this->addReference('degree-' . $entity->getSymbol(), $entity);
        }

        // Save to DB
        $manager->flush();
    }
}