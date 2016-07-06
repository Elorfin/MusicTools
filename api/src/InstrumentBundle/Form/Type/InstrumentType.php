<?php

namespace InstrumentBundle\Form\Type;

use Elorfin\JsonApiBundle\Form\JsonApiRequestHandler;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

/**
 * Instrument form definition.
 */
class InstrumentType extends AbstractType
{
    /**
     * Create the Form definition.
     *
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->setRequestHandler(new JsonApiRequestHandler());

        $builder
            ->add('id', HiddenType::class)
            ->add('name', TextType::class)
            ->add('default', CheckboxType::class)
            ->add('favourite', CheckboxType::class)
            ->add('manufacturer', TextType::class)
            ->add('model', TextType::class)
            ->add('instrumentType', EntityType::class, [
                'class' => 'InstrumentBundle:InstrumentType',
                'choice_label' => 'name',
            ])
        ;

        // Add specification
        $formModifier = function(FormInterface $form, \InstrumentBundle\Entity\InstrumentType $instrumentType = null) {
            $prefix = null === $instrumentType ? 'Abstract' : $instrumentType->getPrefix();

            $form->add('specification', 'InstrumentBundle\\Form\\Type\\Specification\\'.$prefix.'SpecificationType');
        };

        $builder->addEventListener(
            FormEvents::PRE_SET_DATA,
            function(FormEvent $event) use ($formModifier) {
                // Get Instrument Entity
                $data = $event->getData();

                $formModifier($event->getForm(), $data->getInstrumentType());
            }
        );

        $builder->get('instrumentType')->addEventListener(
            FormEvents::POST_SUBMIT,
            function(FormEvent $event) use ($formModifier) {
                // Get Instrument Entity
                $instrumentType = $event->getForm()->getData();

                $formModifier($event->getForm()->getParent(), $instrumentType);
            }
        );
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'csrf_protection' => false,
            'data_class' => 'InstrumentBundle\Entity\Instrument',
        ]);
    }
}
