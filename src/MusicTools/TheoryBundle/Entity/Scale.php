<?php

namespace MusicTools\TheoryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Elorfin\ReactorBundle\Entity\UniqueIdentifiableTrait;
use Elorfin\ReactorBundle\Entity\NameableTrait;

/**
 * Scale Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="theory_scale")
 */
class Scale implements \JsonSerializable
{
    /**
     * Add Identifiable behavior
     */
    use UniqueIdentifiableTrait;

    /**
     * Add Nameable behavior
     */
    use NameableTrait;

    public function jsonSerialize()
    {
        return array (
            'type' => 'scales',
            'id'   => $this->id,
            'attributes'  => array (
                'name'    => $this->name,
            )
        );
    }
}
