<?php

namespace InstrumentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;

/**
 * Instrument Type CRUD Controller
 *
 * @Route("/instrument_types")
 */
class InstrumentTypeController extends Controller
{
    /**
     * List all Instrument Types
     * @return array
     *
     * @Route("")
     * @Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('InstrumentBundle:InstrumentType')
            ->findBy(array (), array ('name' => 'ASC'));

        return new JsonApiResponse($entities);
    }

    /**
     * Display an Instrument Type entity
     * @param  integer $id
     * @return mixed
     *
     * @Route("/{id}")
     * @Method("GET")
     */
    public function getAction($id)
    {
        $entity = $this->getEntity($id);

        return new JsonApiResponse($entity);
    }

    /**
     * Retrieve an Instrument Type entity
     *
     * @param  integer $id
     * @return Instrument
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    private function getEntity($id)
    {
        $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository('InstrumentBundle:InstrumentType')->findOneBy( array (
            'id' => $id,
        ));

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Instrument Type entity.');
        }

        return $entity;
    }
}
