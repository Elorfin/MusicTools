<?php

namespace MusicTools\MusicianBundle\Form\Type;

use MusicTools\ResourceBundle\Form\Type\ImageType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MusicianType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('status')
            ->add('description')
            ->add('firstName')
            ->add('lastName')
            ->add('gender', 'choice', array (
                'choices' => array (
                    'male'   => 'Male',
                    'female' => 'Female',
                ),
                'empty_value' => 'Choose a gender',
                'required' => false,
            ))
            ->add('birthDate', 'birthday')
            ->add('location')
            ->add('avatar', new ImageType())
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'MusicTools\MusicianBundle\Entity\Musician'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'musician';
    }
}
