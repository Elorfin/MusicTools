<?php

namespace TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;

/**
 * Interval CRUD Controller.
 *
 * @EXT\Route("/notes")
 */
class NoteController extends Controller
{
    /**
     * List all Notes.
     *
     * @return array
     *
     * @EXT\Route("")
     * @EXT\Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('TheoryBundle:Note\Note')
            ->findBy(array(), array('value' => 'ASC'));

        return new JsonApiResponse($entities);
    }
}
