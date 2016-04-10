<?php

namespace InstrumentBundle\Entity\Tuning;

use CommonBundle\Model\DefaultTrait;
use CommonBundle\Model\NameTrait;
use Doctrine\ORM\Mapping as ORM;

/**
 * AbstractTuning
 * Base class Tunings
 *
 * @ORM\MappedSuperclass
 */
abstract class AbstractTuning
{
    /**
     * Name
     */
    use NameTrait;

    /**
     * Is it the default Tuning ?
     */
    use DefaultTrait;

    /**
     * Category of the Tuning
     * @var TuningCategory
     *
     * @ORM\ManyToOne(targetEntity="InstrumentBundle\Entity\Tuning\TuningCategory")
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
