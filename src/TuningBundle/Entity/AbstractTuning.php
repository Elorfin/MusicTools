<?php

namespace TuningBundle\Entity;

use CommonBundle\Model\DefaultTrait;
use CommonBundle\Model\NameTrait;
use Doctrine\ORM\Mapping as ORM;

/**
 * AbstractTuning
 * Base class Tunings
 *
 * @ORM\MappedSuperclass
 */
abstract class AbstractTuning implements \JsonSerializable
{
    /**
     * Name
     */
    use NameTrait;

    /**
     * Is it the default Tuning of its category ?
     */
    use DefaultTrait;

    /**
     * Category of the Tuning
     * @var TuningCategory
     *
     * @ORM\ManyToOne(targetEntity="TuningBundle\Entity\TuningCategory")
     * @ORM\JoinColumn(name="category_id", referencedColumnName="id", nullable=true)
     */
    protected $category;

    /**
     * Get category
     * @return TuningCategory
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set category
     * @param  TuningCategory $category
     * @return AbstractTuning
     */
    public function setCategory(TuningCategory $category = null)
    {
        $this->category = $category;

        return $this;
    }
}
