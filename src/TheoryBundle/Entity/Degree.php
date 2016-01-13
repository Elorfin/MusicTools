<?php

namespace TheoryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Degree Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="theory_degree")
 */
class Degree implements \JsonSerializable
{
    /**
     * Unique identifier of the Degree
     * @var string
     *
     * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * Name of the Degree
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * Symbol of the Interval
     * @var string
     *
     * @ORM\Column(type="string")
     */
    protected $symbol;

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
     * @return Degree
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get symbol
     * @return string
     */
    public function getSymbol()
    {
        return $this->symbol;
    }

    /**
     * Set symbol
     * @param  string $symbol
     * @return Degree
     */
    public function setSymbol($symbol)
    {
        $this->symbol = $symbol;

        return $this;
    }

    public function jsonSerialize()
    {
        return array (
            'type' => 'degrees',
            'id'   => $this->id,
            'attributes'  => array (
                'name'    => $this->name,
                'symbol'  => $this->symbol,
            )
        );
    }
}
