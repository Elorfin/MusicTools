<?php

namespace MusicTools\ForumBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;

/**
 * Forum
 *
 * @ORM\Entity()
 * @ORM\Table(name="forum")
 */
class Forum
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Name of the Forum
     * @var string
     */
    protected $name;

    /**
     * Description of the Forum
     * @var string
     */
    protected $description;

    /**
     * Threads of the Forum
     * @var \Doctrine\Common\Collections\ArrayCollection
     */
    protected $threads;

    /**
     * Entity constructor
     */
    public function __construct()
    {
        $this->threads = new ArrayCollection();
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription()
    {

    }

    /**
     * Get threads
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function getThreads()
    {
        return $this->threads;
    }

    /**
     * Add thread
     * @param  \MusicTools\ForumBundle\Entity\Thread $thread
     * @return \MusicTools\ForumBundle\Entity\Forum
     */
    public function addThread(Thread $thread)
    {
        if (!$this->threads->contains($thread)) {
            $this->threads->add($thread);

            $thread->setForum($this);
        }

        return $this;
    }

    /**
     * Remove thread
     * @param  \MusicTools\ForumBundle\Entity\Thread $thread
     * @return \MusicTools\ForumBundle\Entity\Forum
     */
    public function removeThread(Thread $thread)
    {
        if ($this->threads->contains($thread)) {
            $this->threads->removeElement($thread);

            $thread->setForum(null);
        }

        return $this;
    }
}