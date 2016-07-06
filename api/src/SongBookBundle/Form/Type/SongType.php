<?php

namespace SongBookBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Elorfin\ResourceBundle\Form\Type\ImageType;

class SongType extends AbstractType
{
    /**
     * Create the Form definition.
     *
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class, ['required' => true])
            ->add('artist', TextType::class)
            ->add('rating', NumberType::class)
            ->add('mastery', NumberType::class)
            ->add('scores', CollectionType::class, ['mapped' => false])
            ->add('lyrics', CollectionType::class, ['mapped' => false])
            ->add('audios', CollectionType::class, ['mapped' => false])
            ->add('videos', CollectionType::class, ['mapped' => false])
            ->add('records', CollectionType::class, ['mapped' => false])
            ->add('cover', ImageType::class)
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'csrf_protection' => false,
            'data_class' => 'SongBookBundle\Entity\Song',
        ]);
    }
}
