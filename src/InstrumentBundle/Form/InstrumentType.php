<?php

namespace InstrumentBundle\Form;

use Elorfin\JsonApiBundle\Form\JsonApiRequestHandler;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

class InstrumentType extends AbstractType
{
    /**
     * Create the Form definition
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->setRequestHandler(new JsonApiRequestHandler());

        $builder
            ->add('name')
            ->add('manufacturer')
            ->add('model')
            ->add('instrumentType', EntityType::class, array(
                'class' => 'InstrumentBundle:InstrumentType',
                'choice_label' => 'name'
            ))
        ;

        // Add specification
        $formModifier = function(FormInterface $form, \InstrumentBundle\Entity\InstrumentType $instrumentType = null) {
            $prefix = null === $instrumentType ? 'Abstract' : $instrumentType->getPrefix();

            $form->add('specification', 'InstrumentBundle\\Form\\Specification\\' . $prefix . 'SpecificationType');
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
                // It's important here to fetch $event->getForm()->getData(), as
                // $event->getData() will get you the client data (that is, the ID)
                $instrumentType = $event->getForm()->getData();

                // since we've added the listener to the child, we'll have to pass on
                // the parent to the callback functions!
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
            'data_class'      => 'InstrumentBundle\Entity\Instrument'
        ]);
    }
}
