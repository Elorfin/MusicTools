<?php

namespace MusicTools\InstrumentBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Guitar Entity
 * Used to store the configuration of a Guitar
 *
 * @ORM\Entity()
 * @ORM\Table(name="guitar")
 */
class Guitar
{
    /**
     * Unique identifier of the Guitar
     * @var integer
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * Manufacturer of the Guitar
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $manufacturer;

    /**
     * Model of the Guitar
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     */
    protected $model;

    /**
     * Shape of the guitar's headstock (6-in-line or 3+3 for a 6 strings guitar)
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $headstock;

    /**
     * Number of strings
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $strings = 6;

    /**
     * Tuning of the Guitar
     * @var
     */
    protected $tuning;

    /**
     * Get id
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get manufacturer
     * @return string
     */
    public function getManufacturer()
    {
        return $this->manufacturer;
    }

    /**
     * Set manufacturer
     * @param string $manufacturer
     * @return $this
     */
    public function setManufacturer($manufacturer)
    {
        $this->manufacturer = $manufacturer;

        return $this;
    }

    /**
     * Get model
     * @return string
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * Set model
     * @param string $model
     * @return $this
     */
    public function setModel($model)
    {
        $this->model = $model;

        return $this;
    }

    public function getHeadstock()
    {
        return $this->headstock;
    }

    public function setHeadstock($headstock)
    {
        $this->headstock = $headstock;

        return $this;
    }

    public function getStrings()
    {
        return $this->strings;
    }

    public function setStrings($strings)
    {
        $this->strings = $strings;

        return $this;
    }
}
