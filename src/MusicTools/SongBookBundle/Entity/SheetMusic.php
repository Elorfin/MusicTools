<?php

namespace MusicTools\SongBookBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use Elorfin\ResourceBundle\Entity\File;

/**
 * SheetMusic
 *
 * @ORM\Entity
 * @ORM\Table(name="sheet_music")
 */
class SheetMusic extends File
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Linked Song
     * @var \MusicTools\SongBookBundle\Entity\Song
     *
     * @ORM\ManyToOne(targetEntity="MusicTools\SongBookBundle\Entity\Song", inversedBy="scores", cascade={"remove", "persist"})
     * @ORM\JoinColumn(name="song_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $song;

    /**
     * Get song
     * @return \MusicTools\SongBookBundle\Entity\Song
     */
    public function getSong()
    {
        return $this->song;
    }

    /**
     * Set song
     * @param  \MusicTools\SongBookBundle\Entity\Song $song
     * @return \MusicTools\SongBookBundle\Entity\SheetMusic
     */
    public function setSong(Song $song = null)
    {
        if (empty($song) && !empty($this->song)) {
            $this->song->removeScore($this);
        }

        $this->song = $song;

        if (!empty($this->song)) {
            // Update song
            $this->song->addScore($this);
        }

        return $this;
    }
}