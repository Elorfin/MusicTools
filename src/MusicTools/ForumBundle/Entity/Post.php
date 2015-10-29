<?php

namespace MusicTools\ForumBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\DescribableTrait;
use Elorfin\ReactorBundle\Entity\NameableTrait;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;

/**
 * Post
 *
 * @ORM\Entity()
 * @ORM\Table(name="forum_post")
 */
class Post
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
     * Thread belongs the Message
     * @var \MusicTools\ForumBundle\Entity\Thread
     */
    protected $thread;

    /**
     * Content text of the Post
     * @var string
     */
    protected $text;

    /**
     * Get thread
     * @return Thread
     */
    public function getThread()
    {
        return $this->thread;
    }

    /**
     * Set thread
     * @param  \MusicTools\ForumBundle\Entity\Thread $thread
     * @return \MusicTools\ForumBundle\Entity\Post
     */
    public function setThread(Thread $thread = null)
    {
        $this->thread = $thread;
        if (null !== $this->thread) {
            $this->thread->addPost($this);
        }

        return $this;
    }

    /**
     * Get text
     * @return string
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * Set text
     * @param string $text
     */
    public function setText($text)
    {
        $this->text = $text;
    }
}