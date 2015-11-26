<?php

namespace MusicTools\TheoryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use Elorfin\ReactorBundle\Entity\NameableTrait;

/**
 * Chord Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="theory_chord")
 */
class Chord
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Add Nameable behavior
     */
    use NameableTrait;

    /**
     * Number of Notes in the Chords
     * Used to classify chords (e.g. triad, tetrad)
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $notesCount;

    /**
     * Symbol of the Chord
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $symbol;

    /**
     * Intervals composing the chord
     * @var \Doctrine\Common\Collections\ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="MusicTools\TheoryBundle\Entity\Interval", cascade={"all"})
     * @ORM\JoinTable(
     *      name               = "theory_chord_interval",
     *      joinColumns        = { @ORM\JoinColumn(name="chord_id",    referencedColumnName="id") },
     *      inverseJoinColumns = { @ORM\JoinColumn(name="interval_id", referencedColumnName="id") }
     * )
     */
    protected $intervals;

    /**
     * Entity constructor
     */
    public function __construct()
    {
        $this->intervals = new ArrayCollection();
    }

    /**
     * Get number of Notes
     * @return integer
     */
    public function getNotesCount()
    {
        return $this->notesCount;
    }

    /**
     * Set number of Notes
     * @param  integer $count
     * @return $this
     */
    public function setNotesCount($count)
    {
        $this->notesCount = $count;

        return $this;
    }

    /**
     * Get symbol
     * @return string
     */
    public function getSymbol()
    {
        return $this->symbol;
    }

    /**
     * Set symbol
     * @param  string $symbol
     * @return $this
     */
    public function setSymbol($symbol)
    {
        $this->symbol = $symbol;

        return $this;
    }

    /**
     * Get the list of intervals of the Chord
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function getIntervals()
    {
        return $this->intervals;
    }

    /**
     * Add an Interval to the Chord
     * @param  \MusicTools\TheoryBundle\Entity\Interval $interval
     * @return \MusicTools\TheoryBundle\Entity\Chord
     */
    public function addInterval(Interval $interval)
    {
        if (!$this->intervals->contains($interval)) {
            $this->intervals->add($interval);
        }

        return $this;
    }

    /**
     * Remove an Interval from the Chord
     * @param  \MusicTools\TheoryBundle\Entity\Interval $interval
     * @return \MusicTools\TheoryBundle\Entity\Chord
     */
    public function removeInterval(Interval $interval)
    {
        if ($this->intervals->contains($interval)) {
            $this->intervals->removeElement($interval);
        }

        return $this;
    }
}
