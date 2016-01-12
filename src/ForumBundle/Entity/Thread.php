<?php

namespace ForumBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Thread
 *
 * @ORM\Entity()
 * @ORM\Table(name="forum_thread")
 */
class Thread
{
    /**
     * Unique identifier of the Thread
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * Name of the Thread
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * Forum belongs the thread
     * @var Forum
     */
    protected $forum;

    /**
     * Posts of the Thread
     * @var ArrayCollection
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
     * @return Thread
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get forum
     * @return Forum
     */
    public function getForum()
    {
        return $this->forum;
    }

    /**
     * Set forum
     * @param  Forum $forum
     * @return Thread
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
     * @param  Post $post
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
     * Remove post
     * @param  Post $post
     * @return Thread
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