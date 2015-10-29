<?php

namespace MusicTools\InstrumentBundle\Factory;

use MusicTools\InstrumentBundle\Entity\InstrumentType;
use Symfony\Component\Process\Exception\LogicException;

class InstrumentFactory
{
    public function getInstrument(InstrumentType $instrumentType)
    {
        $class = $instrumentType->getClass();

        if (class_exists($class)) {
            $instrument = new $class;
        } else {
            throw new LogicException('Try to get an non-existent Instrument named "' . $class . '".');
        }

        return $instrument;
    }
}