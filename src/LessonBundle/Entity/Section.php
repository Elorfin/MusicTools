<?php

namespace LessonBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Section Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="lesson_section")
 */
class Section
{
    /**
     * Unique identifier of the Section
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * Name of the Section
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * Description of the Section
     * @var string
     *
     * @ORM\Column(type="text")
     */
    protected $description;

    /**
     * Lesson
     * @var Lesson
     */
    protected $lesson;

    /**
     * Parent section
     * @var Section
     */
    protected $parent;

    /**
     * Children of the Section
     * @var \Doctrine\Common\Collections\ArrayCollection
     */
    protected $children;

    /**
     * Class constructor
     */
    public function __construct()
    {
        $this->children = new ArrayCollection();
    }

    /**
     * Get id
     * @return string
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
     * @param  string $name
     * @return Lesson
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get description
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set description
     * @param  string $description
     * @return Section
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get Lesson
     * @return Lesson
     */
    public function getLesson()
    {
        return $this->lesson;
    }

    /**
     * Set Lesson
     * @param Lesson $lesson
     * @return $this
     */
    public function setLesson(Lesson $lesson)
    {
        if ($this->lesson != $lesson) {
            $this->lesson = $lesson;
            $this->lesson->addSection($this);
        }

        return $this;
    }

    /**
     * Get parent Section
     * @return Section
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * Set parent section
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
     * Get children
     * @return ArrayCollection
     */
    public function getChildren()
    {
        return $this->children;
    }

    /**
     * Add a child section
     * @param Section $section
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
     * Remove a child section
     * @param Section $section
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
}