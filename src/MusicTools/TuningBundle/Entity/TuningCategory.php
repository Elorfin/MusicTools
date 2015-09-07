<?php

namespace MusicTools\TuningBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Tuning Category Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="music_tuning_category")
 */
class TuningCategory
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
     * List of Tunings
     * @var \Doctrine\Common\Collections\ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="MusicTools\TuningBundle\Entity\Tuning", mappedBy="category")
     */
    protected $tunings;

    /**
     * Entity constructor
     */
    public function __construct()
    {
        $this->tunings = new ArrayCollection();
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
     * @return \MusicTools\TuningBundle\Entity\TuningCategory
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get tunings
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function getTunings()
    {
        return $this->tunings;
    }

    /**
     * Add a Tuning
     * @param  \MusicTools\TuningBundle\Entity\Tuning $tuning
     * @return \MusicTools\TuningBundle\Entity\TuningCategory
     */
    public function addTuning(Tuning $tuning)
    {
        if (!$this->tunings->contains($tuning)) {
            $this->tunings->add($tuning);

            $tuning->setCategory($this);
        }

        return $this;
    }

    /**
     * Remove a tuning
     * @param  \MusicTools\TuningBundle\Entity\Tuning $tuning
     * @return \MusicTools\TuningBundle\Entity\TuningCategory
     */
    public function removeTuning(Tuning $tuning)
    {
        if ($this->tunings->contains($tuning)) {
            $this->tunings->removeElement($tuning);

            $tuning->setCategory(null);
        }

        return $this;
    }
}