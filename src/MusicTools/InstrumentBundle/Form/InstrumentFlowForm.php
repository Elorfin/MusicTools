<?php

namespace MusicTools\InstrumentBundle\Form;

use MusicTools\InstrumentBundle\Entity\Instrument;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Form\Form;

/**
 * A multi-step Form to create new Instruments
 */
class InstrumentFlowForm
{
    /**
     * Form factory
     * @var \Symfony\Component\Form\FormFactoryInterface $formFactory
     */
    protected $formFactory;

    /**
     * Router
     * @var \Symfony\Component\Routing\RouterInterface $router
     */
    protected $router;

    /**
     * Session
     * @var \Symfony\Component\HttpFoundation\Session\SessionInterface
     */
    protected $session;

    /**
     * Number of the current step
     * @var integer
     */
    protected $currentStepNumber = null;

    /**
     * Total of steps in the flow
     * @var integer
     */
    protected $stepCount = null;

    /**
     * Class constructor
     * @param \Symfony\Component\Form\FormFactoryInterface               $formFactory
     * @param \Symfony\Component\Routing\RouterInterface                 $router
     * @param \Symfony\Component\HttpFoundation\Session\SessionInterface $session
     */
    public function __construct(
        FormFactoryInterface $formFactory,
        RouterInterface      $router,
        SessionInterface     $session)
    {
        $this->formFactory = $formFactory;
        $this->router      = $router;
        $this->session     = $session;
    }

    /**
     * Get configuration of the Flow
     * @return array
     */
    public function getConfig()
    {
        return array (
            // Step 1
            array (
                'name'      => 'choose_type',
                'form_type' => '\\MusicTools\InstrumentBundle\\Form\\Type\\CreateWizard\\Step1Type',
                'form_options' => array (
                    'action' => 'instrument_create',
                ),
            ),
            // Step 2
            array (
                'name'      => 'choose_model',
                'form_type' => '\\MusicTools\InstrumentBundle\\Form\\Type\\CreateWizard\\Step2Type',
                'form_options' => array (
                    'action' => 'instrument_create',
                ),
            ),
            // Step 3
            array (
                'name'      => 'fill_info',
                'form_type' => '\\MusicTools\InstrumentBundle\\Form\\Type\\CreateWizard\\Step3Type',
                'form_options' => array (
                    'action' => 'instrument_create',
                ),
            ),
        );
    }

    /**
     * Retrieve or calculate the number of the current Step
     * @return integer
     */
    public function getCurrentStepNumber()
    {
        if (null == $this->currentStepNumber) {
            $this->guessCurrentStep();
        }

        return $this->currentStepNumber;
    }

    /**
     * Retrieve the name of the current step
     * @return string
     */
    public function getCurrentStepName()
    {
        $stepsConfig = $this->getConfig();

        return $stepsConfig[$this->getCurrentStepNumber()]['name'];
    }

    /**
     * Get number of Steps there are in the Flow
     * @return integer
     */
    public function getStepCount()
    {
        if (null == $this->stepCount) {
            $stepsConfig = $this->getConfig();
            $this->stepCount =count($stepsConfig);
        }

        return $this->stepCount;
    }

    /**
     * Create Form for the current step
     * @param  \MusicTools\InstrumentBundle\Entity\Instrument $data
     * @return \Symfony\Component\Form\Form
     */
    public function createForm(Instrument $data)
    {
        // Retrieve configuration for the current step
        $stepsConfig = $this->getConfig();
        $currentConfig = $stepsConfig[$this->getCurrentStepNumber()];

        $parameters = array ();
        if (!empty($currentConfig['form_options'])) {
            if (!empty($currentConfig['form_options']['action'])) {
                $parameters['action'] = $this->router->generate($currentConfig['form_options']['action']);
            }

            if (!empty($currentConfig['form_options']['method'])) {
                $parameters['method'] = $currentConfig['form_options']['method'];
            }
        }

        return $this->formFactory->create(new $currentConfig['form_type'], $data, $parameters);
    }

    public function nextStep()
    {
        $hasNext = false;
        if ($this->getStepCount() > $this->getCurrentStepNumber()) {
            // We are not on the last step
            $this->currentStepNumber++;

            $hasNext = true;
        }

        return $hasNext;
    }

    /**
     * Calculate the number of the current Step
     * @return integer
     */
    public function guessCurrentStep()
    {
        $this->currentStepNumber = 0;

        // Check if there are data already saved in session
        $sessionData = $this->session->get('instrument_new');
        if (!empty($sessionData)) {
            // Check which step keys we have
            foreach ($this->getConfig() as $config) {
                if (!empty($sessionData[$config['name']])) {
                    // Data for current step isset
                    $this->currentStepNumber++;
                } else {
                    // We don't need to check further
                    break;
                }
            }
        }

        return $this->currentStepNumber;
    }

    /**
     * @param \Symfony\Component\Form\Form $form
     */
    public function saveStepData(Form $form)
    {
        $data = $form->getData();

        // Get the session
        $sessionData = array();
        if ($this->session->has('instrument_new')) {
            // Retrieve previous saved data
            $sessionData = $this->session->get('instrument_new');
        }

        $sessionData[$this->getCurrentStepName()] = $data;

        // Inject updated data into session
        $this->session->set('instrument_new', $sessionData);
    }

    /**
     * Remove form flow data
     * @return $this
     */
    public function reset()
    {
        $this->currentStepNumber = 0;
        $this->session->remove('instrument_new');

        return $this;
    }
}