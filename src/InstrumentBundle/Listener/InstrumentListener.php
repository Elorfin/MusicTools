<?php

namespace InstrumentBundle\Listener;

use Doctrine\ORM\Event\LifecycleEventArgs;
use InstrumentBundle\Entity\Instrument;

/**
 * Instrument Listener
 * Manages Life cycle of the Instrument
 */
class InstrumentListener
{
    /**
     * PrePersist
     * @param Instrument         $instrument
     * @param LifecycleEventArgs $event
     */
    public function prePersistHandler(Instrument $instrument, LifecycleEventArgs $event)
    {
        $specification = $instrument->getSpecification();

        if (null === $specification) {
            $class = $instrument->getInstrumentType()->getClass();
            $specification = new $class();
            $instrument->setSpecification($specification);
        }

        if (!empty($specification)) {
            $event->getEntityManager()->persist($specification);
        }
    }

    /**
     * PreRemove
     * @param Instrument         $instrument
     * @param LifecycleEventArgs $event
     */
    public function preRemoveHandler(Instrument $instrument, LifecycleEventArgs $event)
    {
        $specification = $instrument->getSpecification();
        if (!empty($specification)) {
            $event->getEntityManager()->remove($specification);
        }
    }

    /**
     * PostLoad
     * @param Instrument         $instrument
     * @param LifecycleEventArgs $event
     */
    public function postLoadHandler(Instrument $instrument, LifecycleEventArgs $event)
    {
        $type = $instrument->getInstrumentType();

        if (!empty($type)) {
            $repository = $event
                ->getEntityManager()
                ->getRepository($type->getClass());

            /** @var \InstrumentBundle\Entity\Specification\AbstractSpecification $specification */
            $specification = $repository->findOneBy(array(
                'instrument' => $instrument,
            ));

            if (!empty($specification)) {
                $instrument->setSpecification($specification);
            }
        }
    }
}
