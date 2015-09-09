<?php

namespace MusicTools\ForumBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;

/**
 * Thread
 *
 * @ORM\Entity()
 * @ORM\Table(name="forum_thread")
 */
class Thread
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Forum belongs the thread
     * @var \MusicTools\ForumBundle\Entity\Forum
     */
    protected $forum;

    /**
     * Posts of the Thread
     * @var \Doctrine\Common\Collections\ArrayCollection
     */
    protected $posts;

    /**
     * Entity constructor
     */
    public function __construct()
    {
        $this->posts = new ArrayCollection();
    }

    /**
     * Get forum
     * @return \MusicTools\ForumBundle\Entity\Forum
     */
    public function getForum()
    {
        return $this->forum;
    }

    /**
     * Set forum
     * @param  \MusicTools\ForumBundle\Entity\Forum $forum
     * @return \MusicTools\ForumBundle\Entity\Thread
     */
    public function setForum(Forum $forum)
    {
        $this->forum = $forum;
        if (null !== $this->forum) {
            $this->forum->addThread($this);
        }

        return $this;
    }

    /**
     * Get posts
     * @return ArrayCollection
     */
    public function getPosts()
    {
        return $this->posts;
    }

    /**
     * Add post
     * @param  \MusicTools\ForumBundle\Entity\Post $post
     * @return \MusicTools\ForumBundle\Entity\Thread
     */
    public function addPost(Post $post)
    {
        if (!$this->posts->contains($post)) {
            $this->posts->add($post);

            $post->setThread($this);
        }

        return $this;
    }

    /**
     * Remove post
     * @param  \MusicTools\ForumBundle\Entity\Post $post
     * @return \MusicTools\ForumBundle\Entity\Thread
     */
    public function removePost(Post $post)
    {
        if ($this->posts->contains($post)) {
            $this->posts->removeElement($post);

            $post->setThread(null);
        }

        return $this;
    }
}