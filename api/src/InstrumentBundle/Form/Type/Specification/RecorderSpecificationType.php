<?php

namespace InstrumentBundle\Form\Type\Specification;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class RecorderSpecificationType.
 */
class RecorderSpecificationType extends AbstractSpecificationType
{
    /**
     * Create the Form definition.
     *
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        $builder
            ->add('range')
            ->add('fingering')
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'csrf_protection' => false,
            'data_class' => 'InstrumentBundle\Entity\Specification\RecorderSpecification',
        ]);
    }
}
