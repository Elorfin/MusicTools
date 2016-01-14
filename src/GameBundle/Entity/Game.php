<?php

namespace GameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Game Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="game")
 */
class Game implements \JsonSerializable
{
    /**
     * Unique identifier of the Game
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * Name of the Game
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * Description of the Game
     * @var string
     *
     * @ORM\Column(type="text")
     */
    protected $description;

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
     * @return Game
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get description
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set description
     * @param  string $description
     * @return Game
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    public function jsonSerialize()
    {
        return array(
            'type' => 'games',
            'id'   => $this->id,
            'attributes' => array(
                'name'        => $this->name,
                'description' => $this->description,
            )
        );
    }
}
