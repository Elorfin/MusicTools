<?php

namespace UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use CommonBundle\Model\UniqueIdentifierTrait;
use UserBundle\Model\OwnerTrait;

/**
 * Settings Entity
 * Used to store the User settings
 *
 * @ORM\Entity()
 * @ORM\Table(name="user_settings")
 */
class Settings implements \JsonSerializable
{
    /*
     * ID
     */
    use UniqueIdentifierTrait;

    /*
     * Linked User
     */
    use OwnerTrait;

    /**
     * Volume
     *
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    protected $volume;

    /**
     * Note format
     *
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $noteFormat;

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'type' => 'settings',
            'attributes' => [
                'noteFormat' => $this->noteFormat,
                'volume' => $this->volume,
            ],
        ];
    }
}
