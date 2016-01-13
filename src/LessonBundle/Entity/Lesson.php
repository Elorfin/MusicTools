<?php

namespace LessonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use UserBundle\Entity\OwnableTrait;

/**
 * Lesson Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="lesson")
 */
class Lesson
{
    /**
     * Unique identifier of the Lesson
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * Name of the Lesson
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * Description of the Lesson
     * @var string
     *
     * @ORM\Column(type="text")
     */
    protected $description;

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
     * @return Lesson
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
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