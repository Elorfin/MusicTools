<?php

namespace MusicTools\SongBookBundle\Form\Type;

use Elorfin\ResourceBundle\Form\Type\ImageType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SongType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('artist')
            ->add('rating', 'score', array(
                'icon'       => 'fa fa-fw fa-lg fa-heart',
                'icon_empty' => 'fa fa-fw fa-lg fa-heart-o',
            ))
            ->add('mastery', 'score')
            ->add('cover', new ImageType())
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'MusicTools\SongBookBundle\Entity\Song'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'musictools_songbookbundle_song';
    }
}
