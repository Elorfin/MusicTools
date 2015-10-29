<?php

namespace MusicTools\TheoryBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use MusicTools\TheoryBundle\Entity\Scale;

/**
 * Initializes scales
 */
class LoadScaleData implements FixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {

    }
}