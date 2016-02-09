<?php

namespace SongBookBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SongType extends AbstractType
{
    /**
     * Name of the Form
     * @return string
     */
    public function getName()
    {
        return 'song';
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name'    , 'text', array ('required' => true))
            ->add('artist'  , 'text')
            ->add('rating'  , 'number')
            ->add('mastery' , 'number')

            ->add('scores',  'collection', array ('mapped' => false))
            ->add('lyrics',  'collection', array ('mapped' => false))
            ->add('audios',  'collection', array ('mapped' => false))
            ->add('videos',  'collection', array ('mapped' => false))
            ->add('records', 'collection', array ('mapped' => false))

            ->add('cover', 'resource_image')
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'csrf_protection' => false,
            'data_class' => 'SongBookBundle\Entity\Song'
        ));
    }
}
