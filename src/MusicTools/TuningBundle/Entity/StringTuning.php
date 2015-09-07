<?php

namespace MusicTools\TuningBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use MusicTools\TheoryBundle\Entity\Note;

/**
 * StringTuning Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="music_string_tuning")
 */
class StringTuning
{
    /**
     * Unique identifier of the StringTuning
     * @var integer
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * Number of the String
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $number;

    /**
     * Linked Tuning
     * @var \MusicTools\TuningBundle\Entity\Tuning
     *
     * @ORM\ManyToOne(targetEntity="MusicTools\TuningBundle\Entity\Tuning", inversedBy="strings")
     * @ORM\JoinColumn(name="tuning_id", referencedColumnName="id")
     */
    protected $tuning;

    /**
     * Note of the String
     * @var \MusicTools\TheoryBundle\Entity\Note
     *
     * @ORM\ManyToOne(targetEntity="MusicTools\TheoryBundle\Entity\Note")
     * @ORM\JoinColumn(name="note_id", referencedColumnName="id")
     */
    protected $note;

    /**
     * Get id
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

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
     * @return \MusicTools\TuningBundle\Entity\StringTuning
     */
    public function setNumber($number)
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Get Tuning
     * @return \MusicTools\TuningBundle\Entity\Tuning
     */
    public function getTuning()
    {
        return $this->tuning;
    }

    /**
     * Set Tuning
     * @param  \MusicTools\TuningBundle\Entity\Tuning $tuning
     * @return \MusicTools\TuningBundle\Entity\StringTuning
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
     * @return \MusicTools\TheoryBundle\Entity\Note
     */
    public function getNote()
    {
        return $this->note;
    }

    /**
     * Set Note
     * @param  \MusicTools\TheoryBundle\Entity\Note $note
     * @return \MusicTools\TuningBundle\Entity\StringTuning
     */
    public function setNote(Note $note)
    {
        $this->note = $note;

        return $this;
    }
}