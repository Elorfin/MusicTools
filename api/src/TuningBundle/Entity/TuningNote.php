<?php

namespace TuningBundle\Entity;

use CommonBundle\Model\UniqueIdentifierTrait;
use Doctrine\ORM\Mapping as ORM;
use TheoryBundle\Entity\Note\Note;

/**
 * TuningNote
 *
 * @ORM\Entity()
 * @ORM\Table(name="tuning_note")
 */
class TuningNote implements \JsonSerializable
{
    /**
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * Order of the Note into the Tuning
     *
     * @var int
     */
    protected $order;

    /**
     * Parent Tuning
     *
     * @var Tuning
     *
     * @ORM\ManyToOne(targetEntity="TuningBundle\Entity\Tuning", inversedBy="notes")
     * @ORM\JoinColumn(name="tuning_id", referencedColumnName="id")
     */
    protected $tuning;

    /**
     * Note
     *
     * @var Note
     *
     * @ORM\ManyToOne(targetEntity="TheoryBundle\Entity\Note\Note")
     * @ORM\JoinColumn(name="note_id", referencedColumnName="id")
     */
    protected $note;

    /**
     * Get order.
     *
     * @return int
     */
    public function getOrder()
    {
        return $this->order;
    }

    /**
     * Set order.
     *
     * @param  int $order
     * @return TuningNote
     */
    public function setOrder($order)
    {
        $this->order = $order;

        return $this;
    }

    /**
     * Get Tuning.
     *
     * @return Tuning
     */
    public function getTuning()
    {
        return $this->tuning;
    }

    /**
     * Set Tuning.
     *
     * @param Tuning $tuning
     * @return TuningNote
     */
    public function setTuning(Tuning $tuning)
    {
        $this->tuning = $tuning;

        return $this;
    }

    /**
     * Get Note.
     *
     * @return Note
     */
    public function getNote()
    {
        return $this->note;
    }

    /**
     * Set Note.
     *
     * @param Note $note
     * @return TuningNote
     */
    public function setNote(Note $note)
    {
        $this->note = $note;

        return $this;
    }

    public function jsonSerialize()
    {
        return [
            // Identifier of the Resource
            'type' => 'tuning_notes',
            'id' => $this->id,

            // Attributes of the Resource
            'attributes' => [
                'order' => $this->order,
            ],

            // Relationships of the Resources
            'relationships' => [
                'note' => [
                    'data' => $this->note,
                ]
            ]
        ];
    }
}
