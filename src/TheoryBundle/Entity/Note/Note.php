<?php

namespace TheoryBundle\Entity\Note;

use Doctrine\ORM\Mapping as ORM;
use TheoryBundle\Entity\Interval;

/**
 * Note Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="theory_note")
 */
class Note implements \JsonSerializable
{
    /**
     * Unique identifier of the Note
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

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
     * Midi number of the Note
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $midi;

    /**
     * Info of the Note (name, color, etc.)
     * @var NoteInfo
     *
     * @ORM\ManyToOne(targetEntity="TheoryBundle\Entity\Note\NoteInfo", cascade={"remove", "persist"})
     * @ORM\JoinColumn(name="info_id", referencedColumnName="id", nullable=true, onDelete="SET NULL")
     */
    protected $info;

    /**
     * Previous note
     * @var Note
     *
     * @ORM\OneToOne(targetEntity="TheoryBundle\Entity\Note\Note")
     * @ORM\JoinColumn(name="previous_id", referencedColumnName="id", nullable=true)
     */
    protected $previous;

    /**
     * Next note
     * @var Note
     *
     * @ORM\OneToOne(targetEntity="TheoryBundle\Entity\Note\Note")
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
     * @return Note
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
     * @return Note
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
     * @return Note
     */
    public function setFrequency($frequency)
    {
        $this->frequency = $frequency;

        return $this;
    }

    /**
     * Get midi
     * @return integer
     */
    public function getMidi()
    {
        return $this->midi;
    }

    /**
     * Set midi
     * @param  integer $midi
     * @return Note
     */
    public function setMidi($midi)
    {
        $this->midi = $midi;

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
     * @param  NoteInfo $info
     * @return Note
     */
    public function setInfo(NoteInfo $info)
    {
        $this->info = $info;

        return $this;
    }

    /**
     * Get previous Note
     * @return Note
     */
    public function getPrevious()
    {
        return $this->previous;
    }

    /**
     * Set previous Note
     * @param Note $previous
     * @return Note
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
     * @return Note
     */
    public function getNext()
    {
        return $this->next;
    }

    /**
     * Set next Note
     * @param Note $next
     * @return Note
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
     * @param  Interval $interval
     * @return Note
     */
    public function addInterval(Interval $interval)
    {
        $value = $interval->getValue();

        return $this->addSemitone($value);
    }

    /**
     * Add semitones to the Note
     * @param  number $count
     * @return Note
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

    public function jsonSerialize()
    {
        return array(
            'type' => 'notes',
            'id'   => $this->id,
            'attributes'     => array(
                // Note properties
                'value'      => $this->value,
                'octave'     => $this->octave,
                'frequency'  => $this->frequency,
                'midi'       => $this->midi,

                // Flatten NoteInfo properties for simpler structure
                'sharp_name' => $this->info->getSharpName(),
                'flat_name'  => $this->info->getFlatName(),
                'accidental' => $this->info->isAccidental(),
                'color'      => $this->info->getColor(),
            )
        );
    }
}
