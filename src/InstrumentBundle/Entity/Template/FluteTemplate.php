<?php

namespace InstrumentBundle\Entity\Template;

use Doctrine\ORM\Mapping as ORM;
use InstrumentBundle\Entity\Instrument\FluteTrait;

/**
 * Template for Flutes
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_template_flute")
 */
class FluteTemplate extends AbstractTemplate
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
     * Add Flute behavior
     */
    use FluteTrait;

    /**
     * Get id
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    public function jsonSerialize()
    {
        return [
            'type' => 'instrument_templates',
            'id'   => $this->id,
            'attributes'  => [
                'name'    => $this->name,
            ]
        ];
    }
}
