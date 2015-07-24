<?php

namespace MusicTools\TheoryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Note Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="music_note")
 */
class Note
{
    /**
     * Unique identifier of the Note
     * @var integer
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * Name of the Note
     * @var string
     *
     * @ORM\Column(type="string", length=10)
     */
    protected $name;

    /**
     * Is the Note accidental ?
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    protected $accidental = false;

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
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set name
     * @param string $name
     * @return $this
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Is accidental ?
     * @return bool
     */
    public function isAccidental()
    {
        return $this->accidental;
    }

    /**
     * Set accidental
     * @param boolean $accidental
     * @return $this
     */
    public function setAccidental($accidental)
    {
        $this->accidental = $accidental;

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
}
