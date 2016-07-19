<?php

namespace InstrumentBundle\Entity\Specification;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use CommonBundle\Model\UniqueIdentifierTrait;
use TuningBundle\Model\TuningTrait;

/**
 * Guitar Entity
 * Used to store the configuration of a Guitar.
 *
 * @ORM\Entity()
 * @ORM\Table(name="instrument_guitar")
 */
class GuitarSpecification extends AbstractSpecification
{
    /**
     * ID
     */
    use UniqueIdentifierTrait;

    /**
     * Tuning of the Guitar
     */
    use TuningTrait;

    /**
     * Shape of the guitar's headstock (in-line or top-bottom).
     *
     * @var string
     *
     * @ORM\Column(type="string")
     * @Assert\Choice(
     *      choices = {"in-line", "top-bottom"},
     *      message = "Choose a valid headstock shape."
     * )
     */
    protected $headstock = 'top-bottom';

    /**
     * Shape of the guitar's body (hollow, semi-hollow, solid).
     *
     * @var string
     *
     * @ORM\Column(type="string")
     * @Assert\Choice(
     *      choices = {"hollow", "semi-hollow", "solid"},
     *      message = "Choose a valid body shape."
     * )
     */
    protected $body = 'hollow';

    /**
     * Amplification type of the Guitar (acoustic, electro-acoustic, electric).
     *
     * @var string
     *
     * @ORM\Column(type="string")
     * @Assert\Choice(
     *      choices = {"acoustic", "electro-acoustic", "electric"},
     *      message = "Choose a valid amplification type."
     * )
     */
    protected $amplification = 'acoustic';

    /**
     * Number of strings.
     *
     * @var int
     *
     * @ORM\Column(type="integer")
     * @Assert\Range(
     *      min = 4,
     *      max = 18,
     *      minMessage = "A Guitar must have at least {{ limit }} strings.",
     *      maxMessage = "A Guitar cannot have more than {{ limit }} strings."
     * )
     */
    protected $strings = 6;

    /**
     * Number of frets.
     *
     * @var int
     *
     * @ORM\Column(type="integer")
     */
    protected $frets = 19;

    /**
     * Is the Guitar left-handed ?
     *
     * @var bool
     *
     * @ORM\Column(type="boolean")
     */
    protected $leftHanded = false;

    /**
     * Get headstock.
     *
     * @return string
     */
    public function getHeadstock()
    {
        return $this->headstock;
    }

    /**
     * Set headstock.
     *
     * @param string $headstock
     *
     * @return $this
     */
    public function setHeadstock($headstock)
    {
        $this->headstock = $headstock;

        return $this;
    }

    /**
     * Get body.
     *
     * @return string
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * Set body.
     *
     * @param string $body
     *
     * @return $this
     */
    public function setBody($body)
    {
        $this->body = $body;

        return $this;
    }

    /**
     * Get amplification.
     *
     * @return string
     */
    public function getAmplification()
    {
        return $this->amplification;
    }

    /**
     * Set amplification.
     *
     * @param string $amplification
     *
     * @return $this
     */
    public function setAmplification($amplification)
    {
        $this->amplification = $amplification;

        return $this;
    }

    /**
     * Get number of strings.
     *
     * @return int
     */
    public function getStrings()
    {
        return $this->strings;
    }

    /**
     * Set number of strings.
     *
     * @param int $strings
     *
     * @return $this
     */
    public function setStrings($strings)
    {
        $this->strings = $strings;

        return $this;
    }

    /**
     * Get number of frets.
     *
     * @return int
     */
    public function getFrets()
    {
        return $this->frets;
    }

    /**
     * Get number of frets.
     *
     * @param int $frets
     *
     * @return $this
     */
    public function setFrets($frets)
    {
        $this->frets = $frets;

        return $this;
    }

    /**
     * Is left handed ?
     *
     * @return bool
     */
    public function isLeftHanded()
    {
        return $this->leftHanded;
    }

    /**
     * Set left handed.
     *
     * @param bool $leftHanded
     *
     * @return $this
     */
    public function setLeftHanded($leftHanded)
    {
        $this->leftHanded = $leftHanded;

        return $this;
    }

    /**
     * Serialize the Entity.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            'type' => 'instrument_specifications',
            'id' => $this->id,
            'attributes' => [
                'leftHanded' => $this->leftHanded,
                'headstock' => $this->headstock,
                'body' => $this->body,
                'amplification' => $this->amplification,
                'strings' => $this->strings,
                'frets' => $this->frets,
            ],
            'relationships' => [
                'tuning' => [
                    'data' => $this->tuning,
                ],
            ],
        ];
    }
}
