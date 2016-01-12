<?php

namespace InstrumentBundle\Entity\Tuning;

use Doctrine\ORM\Mapping as ORM;
use TheoryBundle\Entity\Note\Note;

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
     * @var Tuning
     *
     * @ORM\ManyToOne(targetEntity="InstrumentBundle\Entity\Tuning\Tuning", inversedBy="strings")
     * @ORM\JoinColumn(name="tuning_id", referencedColumnName="id")
     */
    protected $tuning;

    /**
     * Note of the String
     * @var Note
     *
     * @ORM\ManyToOne(targetEntity="TheoryBundle\Entity\Note\Note")
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
     * @return StringTuning
     */
    public function setNumber($number)
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Get Tuning
     * @return Tuning
     */
    public function getTuning()
    {
        return $this->tuning;
    }

    /**
     * Set Tuning
     * @param  Tuning $tuning
     * @return StringTuning
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
     * @return Note
     */
    public function getNote()
    {
        return $this->note;
    }

    /**
     * Set Note
     * @param  Note $note
     * @return StringTuning
     */
    public function setNote(Note $note)
    {
        $this->note = $note;

        return $this;
    }
}