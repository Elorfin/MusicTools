<?php

namespace TheoryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Scale Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="theory_scale")
 */
class Scale implements \JsonSerializable
{
    /**
     * Unique identifier of the Scale
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * Name of the Scale
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $name;

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
     * @return Scale
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

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
