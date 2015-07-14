<?php

namespace MusicTools\ResourceBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

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
            ->addEventListener(FormEvents::SUBMIT, array ($this, 'onSubmit'))
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'MusicTools\ResourceBundle\Entity\Image'
        ));
    }

    /**
     * When data have been validated, upload the file
     * @param FormEvent $event
     */
    public function onSubmit(FormEvent $event)
    {
        /** @var \MusicTools\ResourceBundle\Entity\Image $data */
        $data = $event->getData();

        /** @var \Symfony\Component\HttpFoundation\File\UploadedFile $file */
        $file = $data->getFile();

        var_dump($file);
        die();
    }
}
