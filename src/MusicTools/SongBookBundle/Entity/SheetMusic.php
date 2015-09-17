<?php

namespace MusicTools\SongBookBundle\Entity;

use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use MusicTools\ResourceBundle\Entity\File;

class SheetMusic extends File
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;
}