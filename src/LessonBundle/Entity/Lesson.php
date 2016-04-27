<?php

namespace LessonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use CommonBundle\Model\UniqueIdentifierTrait;
use CommonBundle\Model\NameTrait;
use CommonBundle\Model\DescriptionTrait;
use UserBundle\Model\OwnerTrait;

/**
 * Lesson Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="lesson")
 */
class Lesson implements \JsonSerializable
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
     * Description
     */
    use DescriptionTrait;

    /**
     * Owner
     */
    use OwnerTrait;

    /**
     * Sections of the Lesson
     * @var \Doctrine\Common\Collections\ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="LessonBundle\Entity\Section", mappedBy="lesson", cascade={"all"}, orphanRemoval=true)
     */
    protected $sections;

    /**
     * Entity constructor
     */
    public function __construct()
    {
        $this->sections = new ArrayCollection();
    }

    /**
     * Get sections of the Lesson
     * @return ArrayCollection
     */
    public function getSections()
    {
        return $this->sections;
    }

    /**
     * Add a Section to the lesson
     * @param Section $section
     * @return $this
     */
    public function addSection(Section $section)
    {
        if (!$this->sections->contains($section)) {
            $this->sections->add($section);
            $section->setLesson($this);
        }

        return $this;
    }

    /**
     * Remove a lesson from the section
     * @param Section $section
     * @return $this
     */
    public function removeSection(Section $section)
    {
        if ($this->sections->contains($section)) {
            $this->sections->removeElement($section);
            $section->setLesson(null);
        }

        return $this;
    }
    /**
     * Serialize the Entity
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            'type' => 'lessons',
            'id'   => $this->id,
            'attributes'  => [
                'name'        => $this->name,
                'description' => $this->description,
            ],
            'relationships' => [
                'sections' => [
                    'data' => $this->sections
                ]
            ]
        ];
    }
}
