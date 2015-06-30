<?php

use Elorfin\ReactorBundle\Kernel\Kernel;

class AppKernel extends Kernel
{
    /**
     * Get file which list of bundles to register in the Application
     * @return string
     */
    public function getBundlesFile()
    {
        return $this->getRootDir() . '/config/bundles.yml';
    }

    /**
     * Get file where application configuration is stored
     * @return string
     */
    public function getConfigurationFile()
    {
        return $this->getRootDir() . '/config/config_' . $this->getEnvironment() . '.yml';
    }
}
