<?php

namespace MusicTools\InstrumentBundle\Entity\Tuning;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use MusicTools\TheoryBundle\Entity\Note\Note;

/**
 * StringTuning Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_tuning_string")
 */
class StringTuning
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Number of the String
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $number;

    /**
     * Linked Tuning
     * @var \MusicTools\InstrumentBundle\Entity\Tuning\Tuning
     *
     * @ORM\ManyToOne(targetEntity="MusicTools\InstrumentBundle\Entity\Tuning\Tuning", inversedBy="strings")
     * @ORM\JoinColumn(name="tuning_id", referencedColumnName="id")
     */
    protected $tuning;

    /**
     * Note of the String
     * @var \MusicTools\TheoryBundle\Entity\Note\Note
     *
     * @ORM\ManyToOne(targetEntity="MusicTools\TheoryBundle\Entity\Note\Note")
     * @ORM\JoinColumn(name="note_id", referencedColumnName="id")
     */
    protected $note;

    /**
     * Get number
     * @return integer
     */
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * Set number
     * @param  integer $number
     * @return \MusicTools\InstrumentBundle\Entity\Tuning\StringTuning
     */
    public function setNumber($number)
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Get Tuning
     * @return \MusicTools\InstrumentBundle\Entity\Tuning\Tuning
     */
    public function getTuning()
    {
        return $this->tuning;
    }

    /**
     * Set Tuning
     * @param  \MusicTools\InstrumentBundle\Entity\Tuning\Tuning $tuning
     * @return \MusicTools\InstrumentBundle\Entity\Tuning\StringTuning
     */
    public function setTuning(Tuning $tuning)
    {
        if ($this->tuning != $tuning) {
            $this->tuning = $tuning;
            $tuning->addString($this);
        }

        return $this;
    }

    /**
     * Get Note
     * @return \MusicTools\TheoryBundle\Entity\Note\Note
     */
    public function getNote()
    {
        return $this->note;
    }

    /**
     * Set Note
     * @param  \MusicTools\TheoryBundle\Entity\Note\Note $note
     * @return \MusicTools\InstrumentBundle\Entity\Tuning\StringTuning
     */
    public function setNote(Note $note)
    {
        $this->note = $note;

        return $this;
    }
}