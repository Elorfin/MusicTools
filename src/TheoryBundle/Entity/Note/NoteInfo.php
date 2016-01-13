<?php

namespace TheoryBundle\Entity\Note;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;

/**
 * Note Info Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="theory_note_info")
 */
class NoteInfo
{
    const DISPLAY_SHARP = 'sharpName';
    const DISPLAY_FLAT  = 'flatName';

    /**
     * Unique identifier of the NoteInfo
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

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
     * Color of the Note
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $color;

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
        $property = $displayType;

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
     * @return NoteInfo
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
     * @return NoteInfo
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
     * @return NoteInfo
     */
    public function setAccidental($accidental)
    {
        $this->accidental = $accidental;

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
     * @return NoteInfo
     */
    public function setColor($color)
    {
        $this->color = $color;

        return $this;
    }
}
