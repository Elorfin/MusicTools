<?php

namespace MusicTools\SongBookBundle\Entity;

use Doctrine\ORM\Mapping                    as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use Gedmo\Mapping\Annotation                as Gedmo;
use Symfony\Component\Validator\Constraints as Assert;

use Doctrine\Common\Collections\ArrayCollection;
use MusicTools\ResourceBundle\Entity\Image;
use MusicTools\MusicianBundle\Entity\OwnableTrait;

/**
 * Song
 *
 * @ORM\Table(name="song")
 * @ORM\Entity(repositoryClass="MusicTools\SongBookBundle\Entity\SongRepository")
 * @Gedmo\Loggable
 */
class Song
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Add Ownable behavior
     */
    use OwnableTrait;

    /**
     * Title of the Song
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     */
    protected $title;

    /**
     * Artist of the Song
     * @var string
     *
     * @ORM\Column(name="artist", type="string", length=255, nullable=true)
     */
    protected $artist;

    /**
     * Rating of the Song
     * @var integer
     *
     * @ORM\Column(name="rating", type="integer", nullable=true)
     * @Assert\Type(type="numeric")
     * @Assert\Range(min = 0, max = 10)
     */
    protected $rating = 0;

    /**
     * Level of mastery
     * @var integer
     *
     * @ORM\Column(name="mastery", type="integer", nullable=true)
     * @Assert\Type(type="numeric")
     * @Assert\Range(min = 0, max = 10)
     */
    protected $mastery = 0;

    /**
     * Start date of the learning
     * @var \DateTime
     *
     * @ORM\Column(name="started_at", type="date", nullable=true)
     */
    protected $startedAt;

    /**
     * Cover of the Song
     * @var \MusicTools\ResourceBundle\Entity\Image
     *
     * @ORM\ManyToOne(targetEntity="MusicTools\ResourceBundle\Entity\Image", cascade={"remove", "persist"})
     * @ORM\JoinColumn(name="cover_id", referencedColumnName="id", nullable=true, onDelete="SET NULL")
     */
    protected $cover;

    /**
     * List of Lyrics associated to the Song
     * @var \Doctrine\Common\Collections\ArrayCollection
     */
    protected $lyrics;

    /**
     * List of Audios associated to the Song
     * @var \Doctrine\Common\Collections\ArrayCollection
     */
    protected $audios;

    /**
     * List of Videos associated to the Song
     * @var \Doctrine\Common\Collections\ArrayCollection
     */
    protected $videos;

    /**
     * List of Records associated to the Song
     * @var \Doctrine\Common\Collections\ArrayCollection
     */
    protected $records;

    /**
     * Entity constructor
     */
    public function __construct()
    {
        $this->lyrics  = new ArrayCollection();
        $this->audios  = new ArrayCollection();
        $this->videos  = new ArrayCollection();
        $this->records = new ArrayCollection();
    }

    /**
     * Set title
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
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set artist
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
     * @return string 
     */
    public function getArtist()
    {
        return $this->artist;
    }

    /**
     * Set rating
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
     * @return integer 
     */
    public function getRating()
    {
        return $this->rating;
    }

    /**
     * Set mastery
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
     * @return integer
     */
    public function getMastery()
    {
        return $this->mastery;
    }

    /**
     * Get cover
     * @return Image
     */
    public function getCover()
    {
        return $this->cover;
    }

    /**
     * Set cover
     * @param Image $cover
     * @return $this
     */
    public function setCover(Image $cover)
    {
        $this->cover = $cover;

        return $this;
    }

    public function getAudios()
    {
        return $this->audios;
    }

    public function addAudio()
    {
        return $this;
    }

    public function removeAudio()
    {
        return $this;
    }

    public function getVideos()
    {
        return $this->videos;
    }

    public function addVideo()
    {
        return $this;
    }

    public function removeVideo()
    {
        return $this;
    }

    public function getLyrics()
    {
        return $this->lyrics;
    }

    public function addLyrics()
    {
        return $this;
    }

    public function removeLyrics()
    {
        return $this;
    }

    public function getRecords()
    {
        return $this->records;
    }

    public function addRecord()
    {
        return $this;
    }

    public function removeRecord()
    {
        return $this;
    }
}
