<?php

use Elorfin\ReactorBundle\Kernel\Kernel;

/**
 * Application Kernel
 */
class AppKernel extends Kernel
{
    /**
     * Get file which list the bundles to register in the Application
     * @return string
     */
    public function getBundlesFile()
    {
        return $this->getRootDir() . '/config/kernel/' . $this->getEnvironment() . '.yml';
    }

    /**
     * Get file where application configuration is stored
     * @return string
     */
    public function getConfigurationFile()
    {
        return $this->getRootDir() . '/config/environments/' . $this->getEnvironment() . '.yml';
    }
}
