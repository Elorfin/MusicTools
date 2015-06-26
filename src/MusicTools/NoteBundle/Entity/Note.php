<?php

namespace MusicTools\NoteBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Note Entity
 *
 * @ORM\Entity()
 */
class Note
{
    /**
     * Unique identifier of the Note
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    protected $name;
}