<?php

namespace MusicTools\InstrumentBundle\Form\Type\CreateWizard;

use MusicTools\InstrumentBundle\Form\Type\InstrumentType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class Step3Type extends InstrumentType
{
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'MusicTools\InstrumentBundle\Entity\Instrument'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'instrument_wizard_step3';
    }
}
