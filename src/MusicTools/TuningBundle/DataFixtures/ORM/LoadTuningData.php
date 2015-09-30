<?php

namespace MusicTools\TuningBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use MusicTools\TuningBundle\Entity\TuningCategory;
use MusicTools\TuningBundle\Entity\Tuning;

/**
 * Initializes Tunings
 */
class LoadTuningData implements FixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $noteRepo = $manager->getRepository('MusicToolsTheoryBundle:Note');

        $standardTuning = new Tuning();

        $standardStrings = array ('E', '', '', '', '', '');

        foreach ($standardStrings as $index => $string) {
            $stringTuning = new StringTuning();
            $stringTuning->setNumber($index + 1);

            $noteRepo->findByName();

            $stringTuning->setNote();
        }

        $powerCategory = new TuningCategory();
        $powerCategory->setName('Power');

        $manager->persist($powerCategory);

        $dropDTuning = new Tuning();

        $dropDTuning->setName('Drop D');
        $dropDTuning->setCategory($powerCategory);

        // Save to DB
        $manager->flush();
    }
}