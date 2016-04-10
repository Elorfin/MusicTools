<?php

namespace InstrumentBundle\Form\Specification;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;

/**
 * Class GuitarSpecificationType
 */
class GuitarSpecificationType extends AbstractSpecificationType
{
    /**
     * Create the Form definition
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        $builder
            ->add('leftHanded',    CheckboxType::class)
            ->add('headstock',     TextType::class)
            ->add('body',          TextType::class)
            ->add('amplification', TextType::class)
            ->add('strings',       IntegerType::class)
            ->add('frets',         IntegerType::class)
            ->add('tuning')
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'csrf_protection' => false,
            'data_class'      => 'InstrumentBundle\Entity\Specification\GuitarSpecification'
        ]);
    }
}
