<?php

namespace LessonBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\UniqueIdentifierTrait;
use CommonBundle\Model\NameTrait;
use CommonBundle\Model\DescriptionTrait;

/**
 * Section Entity.
 *
 * @ORM\Entity()
 * @ORM\Table(name="lesson_section")
 */
class Section
{
    /*
     * ID
     */
    use UniqueIdentifierTrait;

    /*
     * Name
     */
    use NameTrait;

    /*
     * Description
     */
    use DescriptionTrait;

    /**
     * Lesson.
     *
     * @var Lesson
     *
     * @ORM\ManyToOne(targetEntity="LessonBundle\Entity\Lesson", inversedBy="sections")
     * @ORM\JoinColumn(name="lesson_id", referencedColumnName="id")
     */
    protected $lesson;

    /**
     * Parent section.
     *
     * @var Section
     *
     * @ORM\ManyToOne(targetEntity="LessonBundle\Entity\Section", inversedBy="children")
     * @ORM\JoinColumn(name="parent_id", referencedColumnName="id")
     */
    protected $parent;

    /**
     * Children of the Section.
     *
     * @var \Doctrine\Common\Collections\ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="LessonBundle\Entity\Section", mappedBy="parent")
     */
    protected $children;

    /**
     * Class constructor.
     */
    public function __construct()
    {
        $this->children = new ArrayCollection();
    }

    /**
     * Get Lesson.
     *
     * @return Lesson
     */
    public function getLesson()
    {
        return $this->lesson;
    }

    /**
     * Set Lesson.
     *
     * @param Lesson $lesson
     *
     * @return $this
     */
    public function setLesson(Lesson $lesson = null)
    {
        if ($this->lesson != $lesson) {
            $this->lesson = $lesson;
            if (!empty($this->lesson)) {
                $this->lesson->addSection($this);
            }
        }

        return $this;
    }

    /**
     * Get parent Section.
     *
     * @return Section
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * Set parent section.
     *
     * @param Section $parent
     */
    public function setParent(Section $parent = null)
    {
        if ($this->parent != $parent) {
            $this->parent = $parent;
            if (!empty($this->parent)) {
                $this->parent->addChild($this);
            }
        }
    }

    /**
     * Get children.
     *
     * @return ArrayCollection
     */
    public function getChildren()
    {
        return $this->children;
    }

    /**
     * Add a child section.
     *
     * @param Section $section
     *
     * @return $this
     */
    public function addChild(Section $section)
    {
        if (!$this->children->contains($section)) {
            $this->children->add($section);
            $section->setParent($this);
        }

        return $this;
    }

    /**
     * Remove a child section.
     *
     * @param Section $section
     *
     * @return $this
     */
    public function removeChild(Section $section)
    {
        if ($this->children->contains($section)) {
            $this->children->removeElement($section);
            $section->setParent(null);
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
            'type' => 'lesson_sections',
            'id' => $this->id,
            'attributes' => [
                'name' => $this->name,
                'description' => $this->description,
            ],
            'relationships' => [

            ],
        ];
    }
}
