<?php

namespace ForumBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\UniqueIdentifierTrait;
use UserBundle\Model\OwnerTrait;

/**
 * Post.
 *
 * @ORM\Entity()
 * @ORM\Table(name="forum_post")
 */
class Post
{
    /*
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * Content text of the Post.
     *
     * @var string
     *
     * @ORM\Column(type="text")
     */
    protected $content;

    /*
     * Owner
     */
    use OwnerTrait;

    /**
     * Thread belongs the Post.
     *
     * @var Thread
     */
    protected $thread;

    /**
     * Get id.
     *
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get content.
     *
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set content.
     *
     * @param string $content
     *
     * @return Post
     */
    public function setText($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get thread.
     *
     * @return Thread
     */
    public function getThread()
    {
        return $this->thread;
    }

    /**
     * Set thread.
     *
     * @param Thread $thread
     *
     * @return Post
     */
    public function setThread(Thread $thread = null)
    {
        $this->thread = $thread;
        if (null !== $this->thread) {
            $this->thread->addPost($this);
        }

        return $this;
    }
}
