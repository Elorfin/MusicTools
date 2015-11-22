<?php

namespace MusicTools\TheoryBundle\Entity\Note;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use MusicTools\TheoryBundle\Entity\Interval;

/**
 * Note Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="theory_note")
 */
class Note
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Note relative value (in semitones) to C0
     * @var integer
     *
     * @ORM\Column(name="note_value", type="integer")
     */
    protected $value;

    /**
     * Octave of the Note
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $octave;

    /**
     * Frequency of the Note (in Hz)
     * @var float
     *
     * @ORM\Column(type="float", precision=3)
     */
    protected $frequency;

    /**
     * Info of the Note (name, color, etc.)
     * @var \MusicTools\TheoryBundle\Entity\Note\NoteInfo
     *
     * @ORM\ManyToOne(targetEntity="MusicTools\TheoryBundle\Entity\Note\NoteInfo", cascade={"remove", "persist"})
     * @ORM\JoinColumn(name="info_id", referencedColumnName="id", nullable=true, onDelete="SET NULL")
     */
    protected $info;

    /**
     * Previous note
     * @var \MusicTools\TheoryBundle\Entity\Note\Note
     *
     * @ORM\OneToOne(targetEntity="MusicTools\TheoryBundle\Entity\Note\Note")
     * @ORM\JoinColumn(name="previous_id", referencedColumnName="id", nullable=true)
     */
    protected $previous;

    /**
     * Next note
     * @var \MusicTools\TheoryBundle\Entity\Note\Note
     *
     * @ORM\OneToOne(targetEntity="MusicTools\TheoryBundle\Entity\Note\Note")
     * @ORM\JoinColumn(name="next_id", referencedColumnName="id", nullable=true)
     */
    protected $next;

    /**
     * Get id
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get value
     * @return integer
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Set value
     * @param  integer $value
     * @return \MusicTools\TheoryBundle\Entity\Note\Note
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get octave
     * @return integer
     */
    public function getOctave()
    {
        return $this->octave;
    }

    /**
     * Set octave
     * @param  integer $octave
     * @return \MusicTools\TheoryBundle\Entity\Note\Note
     */
    public function setOctave($octave)
    {
        $this->octave = $octave;

        return $this;
    }

    /**
     * Get frequency
     * @return integer
     */
    public function getFrequency()
    {
        return $this->frequency;
    }

    /**
     * Set frequency
     * @param  float $frequency
     * @return \MusicTools\TheoryBundle\Entity\Note\Note
     */
    public function setFrequency($frequency)
    {
        $this->frequency = $frequency;

        return $this;
    }

    /**
     * Get info
     * @return NoteInfo
     */
    public function getInfo()
    {
        return $this->info;
    }

    /**
     * Set info
     * @param  \MusicTools\TheoryBundle\Entity\Note\NoteInfo $info
     * @return \MusicTools\TheoryBundle\Entity\Note\Note
     */
    public function setInfo(NoteInfo $info)
    {
        $this->info = $info;

        return $this;
    }

    /**
     * Get previous Note
     * @return \MusicTools\TheoryBundle\Entity\Note\Note
     */
    public function getPrevious()
    {
        return $this->previous;
    }

    /**
     * Set previous Note
     * @param \MusicTools\TheoryBundle\Entity\Note\Note $previous
     * @return $this
     */
    public function setPrevious(Note $previous)
    {
        if ($this->previous !== $previous) {
            $this->previous = $previous;

            $previous->setNext($this);
        }

        return $this;
    }

    /**
     * Get next Note
     * @return \MusicTools\TheoryBundle\Entity\Note\Note
     */
    public function getNext()
    {
        return $this->next;
    }

    /**
     * Set next Note
     * @param \MusicTools\TheoryBundle\Entity\Note\Note $next
     * @return $this
     */
    public function setNext(Note $next)
    {
        if ($this->next !== $next) {
            $this->next = $next;

            $next->setPrevious($this);
        }

        return $this;
    }

    /**
     * Add Interval to the Note
     * @param  \MusicTools\TheoryBundle\Entity\Interval $interval
     * @return \MusicTools\TheoryBundle\Entity\Note\Note
     */
    public function addInterval(Interval $interval)
    {
        $value = $interval->getValue();

        return $this->addSemitone($value);
    }

    /**
     * Add semitones to the Note
     * @param  number $count
     * @return \MusicTools\TheoryBundle\Entity\Note\Note
     */
    public function addSemitone($count)
    {
        $newValue = ($this->value + $count) % 12;

        $next = $this;
        for ($i = 0; $i < $newValue; $i++) {
            $next = $next->getNext();
        }

        return $next;
    }
}
