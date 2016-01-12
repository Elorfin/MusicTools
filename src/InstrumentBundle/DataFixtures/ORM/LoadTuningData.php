<?php

namespace InstrumentBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use InstrumentBundle\Entity\Tuning\TuningCategory;
use InstrumentBundle\Entity\Tuning\Tuning;
use InstrumentBundle\Entity\Tuning\StringTuning;

/**
 * Initializes Tunings
 */
class LoadTuningData extends AbstractFixture implements OrderedFixtureInterface
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
        /*$noteRepo = $manager->getRepository('TheoryBundle:Note\Note');

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
        $manager->flush();*/
    }
}