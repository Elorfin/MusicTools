<?php

namespace SongBookBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\UniqueIdentifierTrait;
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
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * Linked Song
     * @var Song
     *
     * @ORM\ManyToOne(targetEntity="SongBookBundle\Entity\Song", inversedBy="scores", cascade={"remove", "persist"})
     * @ORM\JoinColumn(name="song_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $song;

    /**
     * Get song
     * @return Song
     */
    public function getSong()
    {
        return $this->song;
    }

    /**
     * Set song
     * @param  Song $song
     * @return SheetMusic
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
