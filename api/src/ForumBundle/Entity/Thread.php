<?php

namespace ForumBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\NameTrait;
use CommonBundle\Model\UniqueIdentifierTrait;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Thread.
 *
 * @ORM\Entity()
 * @ORM\Table(name="forum_thread")
 */
class Thread
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
     * Forum belongs the thread.
     *
     * @var Forum
     */
    protected $forum;

    /**
     * Posts of the Thread.
     *
     * @var ArrayCollection
     */
    protected $posts;

    /**
     * Entity constructor.
     */
    public function __construct()
    {
        $this->posts = new ArrayCollection();
    }

    /**
     * Get forum.
     *
     * @return Forum
     */
    public function getForum()
    {
        return $this->forum;
    }

    /**
     * Set forum.
     *
     * @param Forum $forum
     *
     * @return Thread
     */
    public function setForum(Forum $forum)
    {
        $this->forum = $forum;

        return $this;
    }

    /**
     * Get posts.
     *
     * @return ArrayCollection
     */
    public function getPosts()
    {
        return $this->posts;
    }

    /**
     * Add post.
     *
     * @param Post $post
     *
     * @return Thread
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
     * Remove post.
     *
     * @param Post $post
     *
     * @return Thread
     */
    public function removePost(Post $post)
    {
        if ($this->posts->contains($post)) {
            $this->posts->removeElement($post);
        }

        return $this;
    }
}
