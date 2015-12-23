<?php

namespace MusicTools\TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;

/**
 * Interval CRUD Controller
 *
 * @Route("/notes")
 */
class NoteController extends Controller
{
    /**
     * List all Notes
     * @return array
     *
     * @Route("")
     * @Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('MusicToolsTheoryBundle:Note\Note')
            ->findBy(array(), array('value' => 'ASC'));

        return new JsonApiResponse($entities);
    }
}