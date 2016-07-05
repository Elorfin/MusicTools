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
    /**
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * Linked User
     */
    use OwnerTrait;

    /**
     * Language
     *
     * @var string
     */
    protected $language;

    /**
     * Date format
     *
     * @var string
     */
    protected $dateFormat;

    /**
     * List format
     *
     * @var string
     */
    protected $listFormat;

    /**
     * Volume
     *
     * @var integer
     */
    protected $volume;

    /**
     * Note format
     *
     * @var string
     */
    protected $noteFormat;

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'type' => 'settings',
            'attributes' => [
                'language' => $this->language,
                'dateFormat' => $this->dateFormat,
                'listFormat' => $this->listFormat,
                'noteFormat' => $this->noteFormat,
                'volume' => $this->volume,
            ],
            'relationships' => [

            ]
        ];
    }
}
