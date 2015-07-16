<?php

namespace MusicTools\SongBookBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use MusicTools\ResourceBundle\Entity\Image;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Song
 *
 * @ORM\Table(name="song")
 * @ORM\Entity(repositoryClass="MusicTools\SongBookBundle\Entity\SongRepository")
 */
class Song
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     */
    protected $title;

    /**
     * @var string
     *
     * @ORM\Column(name="artist", type="string", length=255, nullable=true)
     */
    protected $artist;

    /**
     * @var integer
     *
     * @ORM\Column(name="rating", type="integer", nullable=true)
     * @Assert\Type(type="numeric")
     * @Assert\Range(min = 0, max = 10)
     */
    protected $rating = 0;

    /**
     * @var integer
     *
     * @ORM\Column(name="mastery", type="integer", nullable=true)
     * @Assert\Type(type="numeric")
     * @Assert\Range(min = 0, max = 10)
     */
    protected $mastery = 0;

    /**
     * Cover of the Song
     * @var \MusicTools\ResourceBundle\Entity\Image
     *
     * @ORM\ManyToOne(targetEntity="MusicTools\ResourceBundle\Entity\Image", cascade={"remove", "persist"})
     * @ORM\JoinColumn(name="cover_id", referencedColumnName="id", nullable=true, onDelete="SET NULL")
     */
    protected $cover;

    protected $lyrics;

    protected $audios;

    protected $videos;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return Song
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set artist
     *
     * @param string $artist
     * @return Song
     */
    public function setArtist($artist)
    {
        $this->artist = $artist;

        return $this;
    }

    /**
     * Get artist
     *
     * @return string 
     */
    public function getArtist()
    {
        return $this->artist;
    }

    /**
     * Set rating
     *
     * @param integer $rating
     * @return Song
     */
    public function setRating($rating)
    {
        $this->rating = $rating;

        return $this;
    }

    /**
     * Get rating
     *
     * @return integer 
     */
    public function getRating()
    {
        return $this->rating;
    }

    /**
     * Set mastery
     *
     * @param integer $mastery
     * @return Song
     */
    public function setMastery($mastery)
    {
        $this->mastery = $mastery;

        return $this;
    }

    /**
     * Get mastery
     *
     * @return integer
     */
    public function getMastery()
    {
        return $this->mastery;
    }

    public function getCover()
    {
        return $this->cover;
    }

    public function setCover(Image $cover)
    {
        $this->cover = $cover;

        return $this;
    }
}
