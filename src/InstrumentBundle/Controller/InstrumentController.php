<?php

namespace InstrumentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;

/**
 * Instrument CRUD Controller
 *
 * @Route("/instruments")
 */
class InstrumentController extends Controller
{
    /**
     * List all Instruments
     * @return array
     *
     * @Route("")
     * @Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('InstrumentBundle:Instrument')
            ->findBy(array (), array ('model' => 'ASC'));

        return new JsonApiResponse($entities);
    }

    /**
     * Display an Instrument entity
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
     * Retrieve an Instrument entity
     *
     * @param  integer $id
     * @return Instrument
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    private function getEntity($id)
    {
        $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository('InstrumentBundle:Instrument')->findOneBy( array (
            'id' => $id,
        ));

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Instrument entity.');
        }

        return $entity;
    }
}
