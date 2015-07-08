<?php

namespace MusicTools\ResourceBundle\Form\Type;

use MusicTools\ResourceBundle\Entity\Image;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;

class ImageType extends AbstractType
{
    /**
     * @return string
     */
    public function getName()
    {
        return 'musictools_resourcebundle_image';
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('file')
            ->addEventListener(
                FormEvents::SUBMIT,
                array($this, 'onSubmit')
            );
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        parent::configureOptions($resolver);

        $resolver->setDefaults(array(
            /*'compound' => true,*/
            'data_class' => 'MusicTools\ResourceBundle\Entity\Image'
        ));
    }

    /**
     * When data have been validated, upload the file
     * @param FormEvent $event
     */
    public function onSubmit(FormEvent $event)
    {
        $data = $event->getData();

        /*$file = $data->getFile();*/

        var_dump($data);
        die();
    }
}