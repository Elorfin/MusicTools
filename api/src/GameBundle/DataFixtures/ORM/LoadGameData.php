<?php

namespace GameBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use GameBundle\Entity\Game;

/**
 * Initializes games.
 */
class LoadGameData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritdoc}
     */
    public function getOrder()
    {
        return 2;
    }

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        // List of Games to insert into the DB
        $games = [
            
        ];

        foreach ($games as $game) {
            $entity = new Game();

            $entity->setName($game['name']);
            $entity->setDescription($game['description']);

            $manager->persist($entity);
        }

        // Save to DB
        $manager->flush();
    }
}
