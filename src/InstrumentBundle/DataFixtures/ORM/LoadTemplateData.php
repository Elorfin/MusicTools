<?php

namespace InstrumentBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use InstrumentBundle\Entity\InstrumentType;

/**
 * Initializes instrument types
 */
class LoadTemplateData extends AbstractFixture implements OrderedFixtureInterface
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
        $templates = array(
            array (
                'type' => 'guitar',
                'name' => 'Classic guitar',
                'specification' => array (
                    'leftHanded'    => false,
                    'headstock'     => 'top-bottom',
                    'body'          => 'hollow',
                    'amplification' => 'acoustic',
                    'strings'       => 6,
                    'frets'         => 19,
                    'tuning'        => null,
                ),
            ),

            array (
                'type' => 'guitar',
                'name' => 'Folk guitar',
                'specification' => array (
                    'leftHanded'    => false,
                    'headstock'     => 'top-bottom',
                    'body'          => 'hollow',
                    'amplification' => 'acoustic',
                    'strings'       => 6,
                    'frets'         => 20,
                    'tuning'        => null,
                ),
            ),

            array (
                'type' => 'guitar',
                'name' => 'Electric guitar',
                'specification' => array (
                    'leftHanded'    => false,
                    'headstock'     => 'in-line',
                    'body'          => 'solid',
                    'amplification' => 'electric',
                    'strings'       => 6,
                    'frets'         => 24,
                    'tuning'        => null,
                ),
            ),
        );

        foreach ($templates as $template) {
            /** @var \InstrumentBundle\Entity\InstrumentType $type */
            $type = $this->getReference($template['type']);
            if ($type) {
                $templateClass = $type->getTemplate();

                /** @var \InstrumentBundle\Entity\Template\AbstractTemplate $entity */
                $entity = new $templateClass;

                $entity->setName($template['name']);
                $entity->setType($type);

                // Set template properties
                if (!empty($template['specification'])) {
                    foreach ($template['specification'] as $propertyName => $propertyValue) {
                        $setter = 'set' . ucwords($propertyName);
                        if (method_exists($entity, $setter)) {
                            $entity->$setter($propertyValue);
                        }
                    }
                }

                $manager->persist($entity);
            }
        }

        $manager->flush();
    }
}