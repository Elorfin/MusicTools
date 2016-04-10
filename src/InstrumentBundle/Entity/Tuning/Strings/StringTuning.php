<?php

namespace InstrumentBundle\Entity\Tuning\Strings;

use CommonBundle\Model\UniqueIdentifierTrait;
use Doctrine\ORM\Mapping as ORM;
use TheoryBundle\Entity\Note\Note;

/**
 * StringTuning Entity
 * Stores a String and its associated Note
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_tuning_string")
 */
class StringTuning
{
    /**
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * Number of the String
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $number;

    /**
     * Linked Tuning
     * @var StringsTuning
     *
     * @ORM\ManyToOne(targetEntity="InstrumentBundle\Entity\Tuning\Strings\StringsTuning", inversedBy="strings")
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
     * @return StringsTuning
     */
    public function getTuning()
    {
        return $this->tuning;
    }

    /**
     * Set Tuning
     * @param  StringsTuning $tuning
     * @return StringTuning
     */
    public function setTuning(StringsTuning $tuning)
    {
        $this->tuning = $tuning;

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
