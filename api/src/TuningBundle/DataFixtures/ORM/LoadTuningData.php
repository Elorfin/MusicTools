<?php

namespace TuningBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use InstrumentBundle\Entity\InstrumentType;
use TheoryBundle\Entity\Note\Note;
use TuningBundle\Entity\Tuning;
use TuningBundle\Entity\TuningNote;

/**
 * Initializes Tunings.
 */
class LoadTuningData extends AbstractFixture implements OrderedFixtureInterface
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
        $tunings = [
            [
                'instrumentType' => 'guitar',
                'default' => true,
                'name' => 'Standard',
                'notes' => ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
            ], [
                'instrumentType' => 'bass',
                'default' => true,
                'name' => 'Standard',
                'notes' => ['E1', 'A1', 'D2', 'G2']
            ]
        ];

        foreach ($tunings as $tuning) {
            $entity = new Tuning();

            /** @var InstrumentType $instrumentType */
            $instrumentType = $this->getReference($tuning['instrumentType']);

            $entity->setInstrumentType($instrumentType);
            $entity->setName($tuning['name']);
            $entity->setDefault($tuning['default']);

            // Add tuning Notes
            foreach ($tuning['notes'] as $index => $note) {
                /** @var Note $noteEntity */
                $noteEntity = $this->getReference('note-'.$note);

                $tuningNote = new TuningNote();
                $tuningNote->setOrder($index);
                $tuningNote->setNote($noteEntity);

                $entity->addNote($tuningNote);
            }

            $manager->persist($entity);

            // Store reference for use in other DataFixtures
            $this->addReference($tuning['instrumentType'].'-'.strtolower($tuning['name']), $entity);
        }

        $manager->flush();
    }
}
