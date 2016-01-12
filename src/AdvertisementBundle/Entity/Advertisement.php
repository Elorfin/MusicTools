<?php

namespace AdvertisementBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Advertisement
 *
 * @ORM\Entity()
 * @ORM\Table(name="advertisement")
 */
class Advertisement
{
    /**
     * Unique identifier of the Entity
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * Name of the Ad
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * Description of the Ad
     * @var string
     *
     * @ORM\Column(type="text")
     */
    protected $description;

    /**
     * Get ID
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
     * @return Advertisement
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
     * @return Advertisement
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }
}