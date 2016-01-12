<?php

namespace LessonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use MusicianBundle\Entity\OwnableTrait;

/**
 * Lesson Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="lesson")
 */
class Lesson
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Add Nameable behavior
     */
    use NameableTrait;

    /**
     * Add Describable behavior
     */
    use DescribableTrait;

    /**
     * Add Ownable behavior
     */
    use OwnableTrait;

    /**
     * Sections of the Lesson
     * @var \Doctrine\Common\Collections\ArrayCollection
     */
    protected $sections;

    /**
     * Class constructor
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

            $section->setLesson($this);
        }

        return $this;
    }
}