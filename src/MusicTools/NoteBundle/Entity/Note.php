<?php

namespace MusicTools\NoteBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Note Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="note")
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
