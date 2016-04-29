<?php

namespace TheoryBundle\Entity\Note;

use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\UniqueIdentifierTrait;

/**
 * Note Info Entity.
 *
 * @ORM\Entity()
 * @ORM\Table(name="theory_note_info")
 */
class NoteInfo
{
    const DISPLAY_SHARP = 'sharpName';
    const DISPLAY_FLAT = 'flatName';

    /*
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * Sharp Name of the Note.
     *
     * @var string
     *
     * @ORM\Column(name="sharp_name", type="string", length=10)
     */
    protected $sharpName;

    /**
     * Flat Name of the Note.
     *
     * @var string
     *
     * @ORM\Column(name="flat_name", type="string", length=10)
     */
    protected $flatName;

    /**
     * Is the Note accidental ?
     *
     * @var bool
     *
     * @ORM\Column(type="boolean")
     */
    protected $accidental = false;

    /**
     * Color of the Note.
     *
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $color;

    /**
     * Get name.
     *
     * @param string $displayType
     *
     * @return string
     */
    public function getName($displayType = self::DISPLAY_SHARP)
    {
        $property = $displayType;

        return $this->$property;
    }

    /**
     * Get sharp name.
     *
     * @return string
     */
    public function getSharpName()
    {
        return $this->sharpName;
    }

    /**
     * Set sharp name.
     *
     * @param string $sharpName
     *
     * @return NoteInfo
     */
    public function setSharpName($sharpName)
    {
        $this->sharpName = $sharpName;

        return $this;
    }

    /**
     * Get flat name.
     *
     * @return string
     */
    public function getFlatName()
    {
        return $this->flatName;
    }

    /**
     * Set flat name.
     *
     * @param string $flatName
     *
     * @return NoteInfo
     */
    public function setFlatName($flatName)
    {
        $this->flatName = $flatName;

        return $this;
    }

    /**
     * Is accidental ?
     *
     * @return bool
     */
    public function isAccidental()
    {
        return $this->accidental;
    }

    /**
     * Set accidental.
     *
     * @param bool $accidental
     *
     * @return NoteInfo
     */
    public function setAccidental($accidental)
    {
        $this->accidental = $accidental;

        return $this;
    }

    /**
     * Get color.
     *
     * @return string
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * Set color.
     *
     * @param string $color
     *
     * @return NoteInfo
     */
    public function setColor($color)
    {
        $this->color = $color;

        return $this;
    }
}
