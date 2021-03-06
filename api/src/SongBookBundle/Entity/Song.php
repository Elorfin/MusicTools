<?php

namespace SongBookBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\UniqueIdentifierTrait;
use CommonBundle\Model\NameTrait;
use UserBundle\Model\OwnerTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Elorfin\ResourceBundle\Entity\Image;

/**
 * Song.
 *
 * @ORM\Table(name="song")
 * @ORM\Entity()
 */
class Song implements \JsonSerializable
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
     * Artist of the Song.
     *
     * @var string
     *
     * @ORM\Column(name="artist", type="string", length=255, nullable=true)
     */
    protected $artist;

    /**
     * Rating of the Song.
     *
     * @var int
     *
     * @ORM\Column(name="rating", type="integer", nullable=true)
     */
    protected $rating = 0;

    /**
     * Level of mastery.
     *
     * @var int
     *
     * @ORM\Column(name="mastery", type="integer", nullable=true)
     */
    protected $mastery = 0;

    /**
     * Start date of the learning.
     *
     * @var \DateTime
     *
     * @ORM\Column(name="started_at", type="date", nullable=true)
     */
    protected $startedAt;

    /**
     * Cover of the Song.
     *
     * @var \Elorfin\ResourceBundle\Entity\Image
     *
     * @ORM\ManyToOne(targetEntity="Elorfin\ResourceBundle\Entity\Image", cascade={"remove", "persist"})
     * @ORM\JoinColumn(name="cover_id", referencedColumnName="id", nullable=true, onDelete="SET NULL")
     */
    protected $cover;

    /**
     * Scores of the Song.
     *
     * @var \Doctrine\Common\Collections\ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="SongBookBundle\Entity\SheetMusic", mappedBy="song")
     */
    protected $scores;

    /**
     * Owner
     */
    use OwnerTrait;

    /**
     * Entity constructor.
     */
    public function __construct()
    {
        $this->scores = new ArrayCollection();
    }

    /**
     * Set artist.
     *
     * @param string $artist
     *
     * @return Song
     */
    public function setArtist($artist)
    {
        $this->artist = $artist;

        return $this;
    }

    /**
     * Get artist.
     *
     * @return string
     */
    public function getArtist()
    {
        return $this->artist;
    }

    /**
     * Set rating.
     *
     * @param int $rating
     *
     * @return Song
     */
    public function setRating($rating)
    {
        $this->rating = $rating;

        return $this;
    }

    /**
     * Get rating.
     *
     * @return int
     */
    public function getRating()
    {
        return $this->rating;
    }

    /**
     * Set mastery.
     *
     * @param int $mastery
     *
     * @return Song
     */
    public function setMastery($mastery)
    {
        $this->mastery = $mastery;

        return $this;
    }

    /**
     * Get mastery.
     *
     * @return int
     */
    public function getMastery()
    {
        return $this->mastery;
    }

    /**
     * Get cover.
     *
     * @return Image
     */
    public function getCover()
    {
        return $this->cover;
    }

    /**
     * Set cover.
     *
     * @param Image $cover
     *
     * @return $this
     */
    public function setCover(Image $cover)
    {
        $this->cover = $cover;

        return $this;
    }

    public function getScores()
    {
        return $this->scores;
    }

    /**
     * Add a score file.
     *
     * @param SheetMusic $score
     *
     * @return $this
     */
    public function addScore(SheetMusic $score)
    {
        if (!$this->scores->contains($score)) {
            $this->scores->add($score);

            $score->setSong($this);
        }

        return $this;
    }

    /**
     * Remove a score file.
     *
     * @param SheetMusic $score
     *
     * @return $this
     */
    public function removeScore(SheetMusic $score)
    {
        if ($this->scores->contains($score)) {
            $this->scores->removeElement($score);
        }

        return $this;
    }

    /**
     * Serialize the Entity.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            // Identifier of the Resource
            'type' => 'songs',
            'id' => $this->id,

            // Attributes of the Resource
            'attributes' => [
                'name' => $this->name,
                'artist' => $this->artist,
                'rating' => $this->rating,
                'mastery' => $this->mastery,
                'started_at' => $this->startedAt,
            ],

            // Relationships with other Resources
            'relationships' => [
                'cover' => [
                    'data' => $this->cover,
                ],
                'scores' => [
                    'data' => $this->scores,
                ],
            ],
        ];
    }
}
