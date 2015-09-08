<?php

namespace MusicTools\TheoryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;

/**
 * Note Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="music_note")
 */
class Note implements \JsonSerializable
{
    const DISPLAY_SHARP = 'sharpName';
    const DISPLAY_FLAT  = 'flatName';

    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Sharp Name of the Note
     * @var string
     *
     * @ORM\Column(name="sharp_name", type="string", length=10)
     */
    protected $sharpName;

    /**
     * Flat Name of the Note
     * @var string
     *
     * @ORM\Column(name="flat_name", type="string", length=10)
     */
    protected $flatName;

    /**
     * Is the Note accidental ?
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    protected $accidental = false;

    /**
     * Note relative value to A
     * @var integer
     *
     * @ORM\Column(name="note_value", type="integer")
     */
    protected $value;

    /**
     * Color of the Note
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $color;

    /**
     * Previous note
     * @var \MusicTools\TheoryBundle\Entity\Note
     *
     * @ORM\OneToOne(targetEntity="MusicTools\TheoryBundle\Entity\Note")
     * @ORM\JoinColumn(name="previous_id", referencedColumnName="id")
     */
    protected $previous;

    /**
     * Next note
     * @var \MusicTools\TheoryBundle\Entity\Note
     *
     * @ORM\OneToOne(targetEntity="MusicTools\TheoryBundle\Entity\Note")
     * @ORM\JoinColumn(name="next_id", referencedColumnName="id")
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
     * Get name
     * @param  string $displayType
     * @return string
     */
    public function getName($displayType = self::DISPLAY_SHARP)
    {
        $property = self::DISPLAY_SHARP;

        return $this->$property;
    }

    /**
     * Get sharp name
     * @return string
     */
    public function getSharpName()
    {
        return $this->sharpName;
    }

    /**
     * Set sharp name
     * @param string $sharpName
     * @return \MusicTools\TheoryBundle\Entity\Note
     */
    public function setSharpName($sharpName)
    {
        $this->sharpName = $sharpName;

        return $this;
    }

    /**
     * Get flat name
     * @return string
     */
    public function getFlatName()
    {
        return $this->flatName;
    }

    /**
     * Set flat name
     * @param string $flatName
     * @return \MusicTools\TheoryBundle\Entity\Note
     */
    public function setFlatName($flatName)
    {
        $this->flatName = $flatName;

        return $this;
    }

    /**
     * Is accidental ?
     * @return boolean
     */
    public function isAccidental()
    {
        return $this->accidental;
    }

    /**
     * Set accidental
     * @param boolean $accidental
     * @return \MusicTools\TheoryBundle\Entity\Note
     */
    public function setAccidental($accidental)
    {
        $this->accidental = $accidental;

        return $this;
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
     * @return \MusicTools\TheoryBundle\Entity\Note
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get color
     * @return string
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * Set color
     * @param  string $color
     * @return \MusicTools\TheoryBundle\Entity\Note
     */
    public function setColor($color)
    {
        $this->color = $color;

        return $this;
    }

    /**
     * Get previous Note
     * @return \MusicTools\TheoryBundle\Entity\Note
     */
    public function getPrevious()
    {
        return $this->previous;
    }

    /**
     * Set previous Note
     * @param \MusicTools\TheoryBundle\Entity\Note $previous
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
     * @return \MusicTools\TheoryBundle\Entity\Note
     */
    public function getNext()
    {
        return $this->next;
    }

    /**
     * Set next Note
     * @param \MusicTools\TheoryBundle\Entity\Note $next
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
     * @return \MusicTools\TheoryBundle\Entity\Note
     */
    public function addInterval(Interval $interval)
    {
        $value = $interval->getValue();

        return $this->addSemitone($value);
    }

    /**
     * Add semitones to the Note
     * @param  number $count
     * @return \MusicTools\TheoryBundle\Entity\Note
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

    /**
     * {@inheritDoc}
     */
    public function jsonSerialize()
    {
        return array (
            'id'         => $this->id,
            'sharpName'  => $this->sharpName,
            'flatName'   => $this->flatName,
            'accidental' => $this->accidental,
            'value'      => $this->value,
            'color'      => $this->color,
        );
    }
}
