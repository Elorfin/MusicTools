<?php

namespace InstrumentBundle\Form\Specification;

use Elorfin\JsonApiBundle\Form\JsonApiRequestHandler;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;

class GuitarSpecificationType extends AbstractType
{
    /**
     * Create the Form definition
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        /*$builder->setRequestHandler(new JsonApiRequestHandler());*/

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
