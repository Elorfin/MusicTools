<?php

namespace InstrumentBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use InstrumentBundle\Entity\Instrument;

/**
 * Initializes instruments
 * Loads generic platform instrument into the DB.
 */
class LoadInstrumentData extends AbstractFixture implements OrderedFixtureInterface
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
        $instruments = array(
            array(
                'type' => 'guitar',
                'name' => 'Classic guitar',
                'specification' => array(
                    'leftHanded' => false,
                    'headstock' => 'top-bottom',
                    'body' => 'hollow',
                    'amplification' => 'acoustic',
                    'strings' => 6,
                    'frets' => 19,
                    'tuning' => null,
                ),
            ),

            array(
                'type' => 'guitar',
                'name' => 'Folk guitar',
                'specification' => array(
                    'leftHanded' => false,
                    'headstock' => 'top-bottom',
                    'body' => 'hollow',
                    'amplification' => 'acoustic',
                    'strings' => 6,
                    'frets' => 20,
                    'tuning' => null,
                ),
            ),

            array(
                'type' => 'guitar',
                'name' => 'Electric guitar',
                'specification' => array(
                    'leftHanded' => false,
                    'headstock' => 'in-line',
                    'body' => 'solid',
                    'amplification' => 'electric',
                    'strings' => 6,
                    'frets' => 24,
                    'tuning' => null,
                ),
            ),

            array(
                'type' => 'bass',
                'name' => 'Bass 4 strings',
                'specification' => array(
                    'leftHanded' => false,
                    'headstock' => 'in-line',
                    'body' => 'solid',
                    'amplification' => 'electric',
                    'strings' => 4,
                    'frets' => 24,
                    'tuning' => null,
                ),
            ),

            array(
                'type' => 'bass',
                'name' => 'Bass 5 strings',
                'specification' => array(
                    'leftHanded' => false,
                    'headstock' => 'in-line',
                    'body' => 'solid',
                    'amplification' => 'electric',
                    'strings' => 5,
                    'frets' => 24,
                    'tuning' => null,
                ),
            ),
        );

        foreach ($instruments as $instrument) {
            /** @var \InstrumentBundle\Entity\InstrumentType $type */
            $type = $this->getReference($instrument['type']);
            if ($type) {
                $entity = new Instrument();

                $entity->setName($instrument['name']);
                $entity->setInstrumentType($type);

                $specificationClass = $type->getClass();

                /** @var \InstrumentBundle\Entity\Specification\AbstractSpecification $specification */
                $specification = new $specificationClass();

                // Set template properties
                if (!empty($instrument['specification'])) {
                    foreach ($instrument['specification'] as $propertyName => $propertyValue) {
                        $setter = 'set'.ucwords($propertyName);
                        if (method_exists($specification, $setter)) {
                            $specification->$setter($propertyValue);
                        }
                    }
                }

                $entity->setSpecification($specification);

                $manager->persist($entity);
                $manager->persist($specification);
            }
        }

        $manager->flush();
    }
}
