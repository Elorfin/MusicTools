<?php

namespace TuningBundle\Entity;

use CommonBundle\Model\DefaultTrait;
use CommonBundle\Model\NameTrait;
use CommonBundle\Model\UniqueIdentifierTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Tuning
 *
 * @ORM\Entity()
 * @ORM\Table(name="tuning")
 */
class Tuning implements \JsonSerializable
{
    /**
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * Name
     */
    use NameTrait;

    /**
     * Is it the default Tuning of its category ?
     */
    use DefaultTrait;

    /**
     * Notes that compose the Tuning
     *
     * @var ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="TuningBundle\Entity\TuningNote", mappedBy="tuning", orphanRemoval=true)
     * @ORM\OrderBy({"order" = "ASC"})
     */
    protected $notes;

    /**
     * Category of the Tuning.
     *
     * @var TuningCategory
     *
     * @ORM\ManyToOne(targetEntity="TuningBundle\Entity\TuningCategory")
     * @ORM\JoinColumn(name="category_id", referencedColumnName="id", nullable=true)
     */
    protected $category;

    /**
     * Tuning constructor.
     */
    public function __construct()
    {
        $this->notes = new ArrayCollection();
    }

    /**
     * Get Notes.
     *
     * @return ArrayCollection
     */
    public function getNotes()
    {
        return $this->notes;
    }

    /**
     * Add a Note.
     *
     * @param TuningNote $tuningNote
     * @return Tuning
     */
    public function addNote(TuningNote $tuningNote)
    {
        if (!$this->notes->contains($tuningNote)) {
            $this->notes->add($tuningNote);

            $tuningNote->setTuning($this);
        }

        return $this;
    }

    /**
     * Remove a Note.
     *
     * @param TuningNote $tuningNote
     * @return Tuning
     */
    public function removeNote(TuningNote $tuningNote)
    {
        if ($this->notes->contains($tuningNote)) {
            $this->notes->removeElement($tuningNote);
        }

        return $this;
    }

    /**
     * Get category.
     *
     * @return TuningCategory
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set category.
     *
     * @param TuningCategory $category
     *
     * @return Tuning
     */
    public function setCategory(TuningCategory $category = null)
    {
        $this->category = $category;

        return $this;
    }

    public function jsonSerialize()
    {
        return [
            // Identifier of the Resource
            'type' => 'tunings',
            'id' => $this->id,

            // Attributes of the Resource
            'attributes' => [
                'name' => $this->name,
                'default' => $this->default,
            ],

            // Relationships with other Resources
            'relationships' => [
                'category' => [
                    'data' => $this->category,
                ],
                'notes' => [
                    'data' => $this->notes,
                ]
            ],
        ];
    }
}
