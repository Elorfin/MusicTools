<?php

namespace TheoryBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use TheoryBundle\Entity\Interval;

/**
 * Initializes Intervals
 */
class LoadIntervalData extends AbstractFixture implements OrderedFixtureInterface
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
        // Full list of Intervals to insert into the DB
        $intervals = array(
            array( 'symbol' => 'P1', 'value' => 0,  'number' => 1, 'quality' => 'perfect',    'name' => 'perfect unison'     ),
            array( 'symbol' => 'd2', 'value' => 0,  'number' => 2, 'quality' => 'diminished', 'name' => 'diminished second'  ),

            array( 'symbol' => 'm2', 'value' => 1,  'number' => 2, 'quality' => 'minor',      'name' => 'minor second'       ),
            array( 'symbol' => 'A1', 'value' => 1,  'number' => 1, 'quality' => 'augmented',  'name' => 'augmented unison'   ),

            array( 'symbol' => 'M2', 'value' => 2,  'number' => 2, 'quality' => 'major',      'name' => 'major second'       ),
            array( 'symbol' => 'd3', 'value' => 2,  'number' => 3, 'quality' => 'diminished', 'name' => 'diminished third'   ),

            array( 'symbol' => 'm3', 'value' => 3,  'number' => 3, 'quality' => 'minor',      'name' => 'minor third'        ),
            array( 'symbol' => 'A2', 'value' => 3,  'number' => 2, 'quality' => 'augmented',  'name' => 'augmented second'   ),

            array( 'symbol' => 'M3', 'value' => 4,  'number' => 3, 'quality' => 'major',      'name' => 'major third'        ),
            array( 'symbol' => 'd4', 'value' => 4,  'number' => 4, 'quality' => 'diminished', 'name' => 'diminished fourth'  ),

            array( 'symbol' => 'P4', 'value' => 5,  'number' => 4, 'quality' => 'perfect',    'name' => 'perfect fourth'     ),
            array( 'symbol' => 'A3', 'value' => 5,  'number' => 3, 'quality' => 'augmented',  'name' => 'augmented third'    ),

            array( 'symbol' => 'd5', 'value' => 6,  'number' => 5, 'quality' => 'diminished', 'name' => 'diminished fifth'   ),
            array( 'symbol' => 'A4', 'value' => 6,  'number' => 4, 'quality' => 'augmented',  'name' => 'augmented fourth'   ),

            array( 'symbol' => 'P5', 'value' => 7,  'number' => 5, 'quality' => 'perfect',    'name' => 'perfect fifth'      ),
            array( 'symbol' => 'd6', 'value' => 7,  'number' => 6, 'quality' => 'diminished', 'name' => 'diminished sixth'   ),

            array( 'symbol' => 'm6', 'value' => 8,  'number' => 6, 'quality' => 'minor',      'name' => 'minor sixth'        ),
            array( 'symbol' => 'A5', 'value' => 8,  'number' => 5, 'quality' => 'augmented',  'name' => 'augmented fifth'    ),

            array( 'symbol' => 'M6', 'value' => 9,  'number' => 6, 'quality' => 'major',      'name' => 'major sixth'        ),
            array( 'symbol' => 'd7', 'value' => 9,  'number' => 7, 'quality' => 'diminished', 'name' => 'diminished seventh' ),

            array( 'symbol' => 'm7', 'value' => 10, 'number' => 7, 'quality' => 'minor',      'name' => 'minor seventh'      ),
            array( 'symbol' => 'A6', 'value' => 10, 'number' => 6, 'quality' => 'augmented',  'name' => 'augmented sixth'    ),

            array( 'symbol' => 'M7', 'value' => 11, 'number' => 7, 'quality' => 'major',      'name' => 'major seventh'      ),
            array( 'symbol' => 'd8', 'value' => 11, 'number' => 8, 'quality' => 'diminished', 'name' => 'diminished octave'  ),

            array( 'symbol' => 'P8', 'value' => 12, 'number' => 8, 'quality' => 'perfect',    'name' => 'perfect octave'     ),
            array( 'symbol' => 'A7', 'value' => 12, 'number' => 7, 'quality' => 'augmented',  'name' => 'augmented seventh'  ),
        );

        foreach ($intervals as $interval) {
            $entity = new Interval();

            $entity->setName($interval['name']);
            $entity->setSymbol($interval['symbol']);
            $entity->setValue($interval['value']);
            $entity->setNumber($interval['number']);
            $entity->setQuality($interval['quality']);

            $manager->persist($entity);

            // Store reference for use in other DataFixtures
            $this->addReference('interval-' . $entity->getSymbol(), $entity);
        }

        // Save to DB
        $manager->flush();
    }
}
