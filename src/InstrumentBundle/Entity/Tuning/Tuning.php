<?php

namespace InstrumentBundle\Entity\Tuning;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;

/**
 * Tuning Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_tuning")
 */
class Tuning
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Name of the Tuning
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * Is it the default Tuning ?
     * @var boolean
     *
     * @ORM\Column(name="is_default", type="boolean")
     */
    protected $default = false;

    /**
     * Category of the Tuning
     * @var TuningCategory
     *
     * @ORM\ManyToOne(targetEntity="InstrumentBundle\Entity\Tuning\TuningCategory", inversedBy="tunings")
     * @ORM\JoinColumn(name="category_id", referencedColumnName="id", nullable=true)
     */
    protected $category;

    /**
     * List of Strings
     * @var \Doctrine\Common\Collections\ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="InstrumentBundle\Entity\Tuning\StringTuning", mappedBy="tuning", cascade={"all"})
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
     * Get name
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set name
     * @param  string $name
     * @return Tuning
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Is it the default Tuning ?
     * @return boolean
     */
    public function isDefault()
    {
        return $this->default;
    }

    /**
     * Set default
     * @param  boolean $default
     * @return Tuning
     */
    public function setDefault($default)
    {
        $this->default = $default;

        return $this;
    }

    /**
     * Get category
     * @return TuningCategory
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set category
     * @param  TuningCategory $category
     * @return Tuning
     */
    public function setCategory(TuningCategory $category = null)
    {
        if ($this->category != $category) {
            $this->category = $category;

            if (null !== $this->category) {
                $category->addTuning($this);
            }
        }

        return $this;
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
     * @return Tuning
     */
    public function addString(StringTuning $stringTuning)
    {
        if ($this->strings->contains($stringTuning)) {
            $this->strings->add($stringTuning);

            $stringTuning->setTuning($this);
        }

        return $this;
    }

    /**
     * Remove a string
     * @param  StringTuning $stringTuning
     * @return Tuning
     */
    public function removeString(StringTuning $stringTuning)
    {
        return $this;
    }
}
