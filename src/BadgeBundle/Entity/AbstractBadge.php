<?php

namespace BadgeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AbstractBadge
 *
 * @ORM\MappedSuperclass()
 */
abstract class AbstractBadge
{
    /**
     * Name of the BadgeInstance
     * @var string
     *
     * @ORM\Column(name="badge_name", type="string", length=255)
     */
    protected $name;

    /**
     * Description of the BadgeInstance
     * @var string
     *
     * @ORM\Column(type="text")
     */
    protected $description;

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
     * @return BadgeInstance
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
     * @return BadgeInstance
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }
}