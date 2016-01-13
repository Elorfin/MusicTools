<?php

namespace SongBookBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Doctrine\Common\Collections\ArrayCollection;
use Elorfin\ResourceBundle\Entity\Image;
use UserBundle\Entity\OwnableTrait;

/**
 * Song
 *
 * @ORM\Table(name="song")
 * @ORM\Entity()
 */
class Song implements \JsonSerializable
{
    /**
     * Unique identifier of the UserFriendship
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * Name of the Song
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * Add Ownable behavior
     */
    use OwnableTrait;

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
     */
    protected $rating = 0;

    /**
     * Level of mastery
     * @var integer
     *
     * @ORM\Column(name="mastery", type="integer", nullable=true)
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
     * @var \Elorfin\ResourceBundle\Entity\Image
     *
     * @ORM\ManyToOne(targetEntity="Elorfin\ResourceBundle\Entity\Image", cascade={"remove", "persist"})
     * @ORM\JoinColumn(name="cover_id", referencedColumnName="id", nullable=true, onDelete="SET NULL")
     */
    protected $cover;

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
     * @return Song
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
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

    public function jsonSerialize()
    {
        return array (
            'type' => 'songs',
            'id'   => $this->id,
            'attributes'  => array (
                'name'    => $this->name,
                'artist'  => $this->artist,
                'rating'  => $this->rating,
                'mastery' => $this->mastery,
            )
        );
    }
}
