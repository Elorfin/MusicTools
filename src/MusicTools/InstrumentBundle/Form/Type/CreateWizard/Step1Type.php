<?php

namespace MusicTools\InstrumentBundle\Form\Type\CreateWizard;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class Step1Type extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('type', 'entity', array ('required' => true, 'empty_data' => null, 'empty_value' => '-- select an instrument type --', 'class' => 'MusicToolsInstrumentBundle:InstrumentType'))
        ;
    }

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
        return 'instrument_wizard_step1';
    }
}
