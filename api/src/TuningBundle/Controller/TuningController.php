<?php

namespace TuningBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use InstrumentBundle\Entity\InstrumentType;
use TuningBundle\Entity\Tuning;

/**
 * Tuning CRUD Controller.
 *
 * @Route("/tunings")
 */
class TuningController extends Controller
{
    /**
     * List all Tunings.
     *
     * @param InstrumentType $instrumentType
     *
     * @return array
     *
     * @Route("")
     * @Method("GET")
     */
    public function listAction(InstrumentType $instrumentType)
    {
        $entities = $this->container
            ->get('doctrine.orm.entity_manager')
            ->getRepository($instrumentType->getTemplate())
            ->findBy([
                'type' => $instrumentType,
            ], [
                'name' => 'ASC',
            ]);

        return new JsonApiResponse($entities);
    }

    /**
     * Display an Template entity.
     *
     * @param InstrumentType $instrumentType
     * @param int            $id
     *
     * @return mixed
     *
     * @Route("/{id}")
     * @Method("GET")
     */
    public function getAction(InstrumentType $instrumentType, $id)
    {
        $entity = $this->getEntity($instrumentType, $id);

        return new JsonApiResponse($entity);
    }

    /**
     * Retrieve an Instrument entity.
     *
     * @param InstrumentType $instrumentType
     * @param string         $id
     *
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     *
     * @return Tuning
     */
    private function getEntity(InstrumentType $instrumentType, $id)
    {
        $entity = $this->container
            ->get('doctrine.orm.entity_manager')
            ->getRepository($instrumentType->getTemplate())
            ->findOneBy([
                'id' => $id,
            ]);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find InstrumentTemplate entity.');
        }

        return $entity;
    }
}
