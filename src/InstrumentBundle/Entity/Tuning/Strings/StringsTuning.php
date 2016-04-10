<?php

namespace InstrumentBundle\Entity\Tuning\Strings;

use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\UniqueIdentifierTrait;
use Doctrine\Common\Collections\ArrayCollection;
use InstrumentBundle\Entity\Tuning\AbstractTuning;

/**
 * StringsTuning Entity
 * Stores tuning for string instruments
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_tuning_strings")
 */
class StringsTuning extends AbstractTuning
{
    /**
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * List of Strings
     * @var \Doctrine\Common\Collections\ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="InstrumentBundle\Entity\Tuning\Strings\StringTuning", mappedBy="tuning", cascade={"all"})
     * @ORM\OrderBy({ "number" = "ASC" })
     */
    protected $strings;

    /**
     * Entity constructor
     */
    public function __construct()
    {
        $this->strings = new ArrayCollection();
    }

    /**
     * Get strings
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function getStrings()
    {
        return $this->strings;
    }

    /**
     * Add a string
     * @param  StringTuning $stringTuning
     * @return StringsTuning
     */
    public function addString(StringTuning $stringTuning)
    {
        if (!$this->strings->contains($stringTuning)) {
            $this->strings->add($stringTuning);

            $stringTuning->setTuning($this);
        }

        return $this;
    }

    /**
     * Remove a string
     * @param  StringTuning $stringTuning
     * @return StringsTuning
     */
    public function removeString(StringTuning $stringTuning)
    {
        if ($this->strings->contains($stringTuning)) {
            $this->strings->removeElement($stringTuning);
        }

        return $this;
    }
}