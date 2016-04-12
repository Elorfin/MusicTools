<?php

namespace TuningBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

use TuningBundle\Entity\TuningCategory;
use TuningBundle\Entity\Strings\StringsTuning;
use TuningBundle\Entity\Strings\StringTuning;

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

    }
}