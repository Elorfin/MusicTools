<?php

namespace MusicTools\TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Routing\ClassResourceInterface;

/**
 * Interval CRUD Controller
 */
class NoteController extends Controller implements ClassResourceInterface
{
    /**
     * List all Notes
     * "get_notes"     [GET] /notes
     *
     * @return array
     */
    public function cgetAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('MusicToolsTheoryBundle:Note\Note')
            ->findBy(array(), array('value' => 'ASC'));

        return $entities;
    }
}