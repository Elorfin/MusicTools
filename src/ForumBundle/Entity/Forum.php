<?php

namespace ForumBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Forum
 *
 * @ORM\Entity()
 * @ORM\Table(name="forum")
 */
class Forum
{
    /**
     * Unique identifier of the Forum
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * Add Nameable behavior
     */
    use NameableTrait;

    /**
     * Add Describable behavior
     */
    use DescribableTrait;

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

    /**
     * Get id
     * @return string
     */
    public function getId()
    {
        return $this->id;
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
     * @param  Thread $thread
     * @return Forum
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
     * @param  Thread $thread
     * @return Forum
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