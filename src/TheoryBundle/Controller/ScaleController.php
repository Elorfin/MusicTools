<?php

namespace TheoryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;

/**
 * Scale CRUD Controller
 *
 * @Route("/scales")
 */
class ScaleController extends Controller
{
    /**
     * List all Scales
     * @return array
     *
     * @Route("")
     * @Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('TheoryBundle:Scale')
            ->findBy(array(), array());

        return new JsonApiResponse($entities);
    }

    /**
     * Display a Scale entity
     * @param $id
     * @return array
     *
     * @Route("/{id}")
     * @Method("GET")
     */
    public function getAction($id)
    {
        $entity = $this->getEntity($id);

        return $entity;
    }

    /**
     * Retrieve a Scale entity
     *
     * @param  integer $id
     * @return Scale
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    private function getEntity($id)
    {
        $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository('TheoryBundle:Scale')->findOneBy( array (
            'id' => $id,
        ));

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Scale entity.');
        }

        return $entity;
    }
}