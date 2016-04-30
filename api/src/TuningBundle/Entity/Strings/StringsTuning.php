<?php

namespace TuningBundle\Entity\Strings;

use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\UniqueIdentifierTrait;
use Doctrine\Common\Collections\ArrayCollection;
use TuningBundle\Entity\AbstractTuning;

/**
 * StringsTuning Entity
 * Stores tuning for string instruments.
 *
 * @ORM\Entity()
 * @ORM\Table(name="tuning_strings")
 */
class StringsTuning extends AbstractTuning
{
    /*
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * List of Strings.
     *
     * @var \Doctrine\Common\Collections\ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="TuningBundle\Entity\Strings\StringTuning", mappedBy="tuning", cascade={"all"})
     * @ORM\OrderBy({ "number" = "ASC" })
     */
    protected $strings;

    /**
     * Entity constructor.
     */
    public function __construct()
    {
        $this->strings = new ArrayCollection();
    }

    /**
     * Get strings.
     *
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function getStrings()
    {
        return $this->strings;
    }

    /**
     * Add a string.
     *
     * @param StringTuning $stringTuning
     *
     * @return StringsTuning
     */
    public function addString(StringTuning $stringTuning)
    {
        if (!$this->strings->contains($stringTuning)) {
            $this->strings->add($stringTuning);

            $stringTuning->setTuning($this);
        }

        return $this;
    }

    /**
     * Remove a string.
     *
     * @param StringTuning $stringTuning
     *
     * @return StringsTuning
     */
    public function removeString(StringTuning $stringTuning)
    {
        if ($this->strings->contains($stringTuning)) {
            $this->strings->removeElement($stringTuning);
        }

        return $this;
    }

    /**
     * Serialize the Entity.
     *
     * @return array
     */
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
                'strings' => [
                    'data' => $this->strings,
                ],
            ],
        ];
    }
}
