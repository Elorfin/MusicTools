<?php

namespace InstrumentBundle\Form;

use Elorfin\JsonApiBundle\Form\JsonApiRequestHandler;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class InstrumentType extends AbstractType
{
    /**
     * Create the Form definition
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->setRequestHandler(new JsonApiRequestHandler());

        $builder
            ->add('name')
            ->add('manufacturer')
            ->add('model')
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'csrf_protection' => false,
            'data_class' => 'InstrumentBundle\Entity\Instrument'
        ));
    }
}
