<?php

namespace InstrumentBundle\Entity\Instrument;

/**
 * Guitar
 */
trait GuitarTrait
{
    /**
     * Shape of the guitar's headstock (6-in-line or 3+3 for a 6 strings guitar)
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $headstock = 'top-bottom';

    /**
     * Number of strings
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $strings = 6;

    /**
     * Number of frets
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $frets = 24;

    /**
     * Is the Guitar left-handed ?
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    protected $leftHanded = false;

    /**
     * Tuning of the Guitar
     * @var
     */
    protected $tuning;

    /**
     * Get headstock
     * @return string
     */
    public function getHeadstock()
    {
        return $this->headstock;
    }

    /**
     * Set headstock
     * @param  string $headstock
     * @return $this
     */
    public function setHeadstock($headstock)
    {
        $this->headstock = $headstock;

        return $this;
    }

    /**
     * Get number of strings
     * @return integer
     */
    public function getStrings()
    {
        return $this->strings;
    }

    /**
     * Set number of strings
     * @param  integer $strings
     * @return $this
     */
    public function setStrings($strings)
    {
        $this->strings = $strings;

        return $this;
    }

    /**
     * Get number of frets
     * @return integer
     */
    public function getFrets()
    {
        return $this->frets;
    }

    /**
     * Get number of frets
     * @param  integer $frets
     * @return $this
     */
    public function setFrets($frets)
    {
        $this->frets = $frets;

        return $this;
    }

    /**
     * Is left handed ?
     * @return boolean
     */
    public function isLeftHanded()
    {
        return $this->leftHanded;
    }

    /**
     * Set left handed
     * @param  boolean $leftHanded
     * @return $this
     */
    public function setLeftHanded($leftHanded)
    {
        $this->leftHanded = $leftHanded;

        return $this;
    }
}
