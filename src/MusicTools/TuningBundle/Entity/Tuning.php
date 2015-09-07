<?php

namespace MusicTools\TuningBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Tuning Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="music_tuning")
 */
class Tuning
{
    /**
     * Unique identifier of the Tuning
     * @var integer
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

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
     * @var \MusicTools\TuningBundle\Entity\TuningCategory
     *
     * @ORM\ManyToOne(targetEntity="MusicTools\TuningBundle\Entity\TuningCategory", inversedBy="tunings")
     * @ORM\JoinColumn(name="category_id", referencedColumnName="id", nullable=true)
     */
    protected $category;

    /**
     * List of Strings
     * @var \Doctrine\Common\Collections\ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="MusicTools\TuningBundle\Entity\StringTuning", mappedBy="tuning", cascade={"all"})
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
     * Get id
     * @return integer
     */
    public function getId()
    {
        return $this->id;
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
     * @return \MusicTools\TuningBundle\Entity\Tuning
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
     * @return \MusicTools\TuningBundle\Entity\Tuning
     */
    public function setDefault($default)
    {
        $this->default = $default;

        return $this;
    }

    /**
     * Get category
     * @return \MusicTools\TuningBundle\Entity\TuningCategory
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set category
     * @param  \MusicTools\TuningBundle\Entity\TuningCategory $category
     * @return \MusicTools\TuningBundle\Entity\Tuning
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
     * @param  \MusicTools\TuningBundle\Entity\StringTuning $stringTuning
     * @return \MusicTools\TuningBundle\Entity\Tuning
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
     * @param  \MusicTools\TuningBundle\Entity\StringTuning $stringTuning
     * @return \MusicTools\TuningBundle\Entity\Tuning
     */
    public function removeString(StringTuning $stringTuning)
    {
        return $this;
    }
}
