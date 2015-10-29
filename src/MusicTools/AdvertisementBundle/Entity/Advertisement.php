<?php

namespace MusicTools\AdvertisementBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

use Elorfin\ReactorBundle\Entity\DescribableTrait;
use Elorfin\ReactorBundle\Entity\NameableTrait;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;

/**
 * Advertisement
 *
 * @ORM\Entity()
 * @ORM\Table(name="advertisement")
 */
class Advertisement
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
}