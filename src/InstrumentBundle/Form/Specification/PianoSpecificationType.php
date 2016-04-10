<?php

namespace InstrumentBundle\Form\Specification;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class PianoSpecificationType
 */
class PianoSpecificationType extends AbstractSpecificationType
{
    /**
     * Create the Form definition
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'csrf_protection' => false,
            'data_class'      => 'InstrumentBundle\Entity\Specification\RecorderSpecification'
        ]);
    }
}
