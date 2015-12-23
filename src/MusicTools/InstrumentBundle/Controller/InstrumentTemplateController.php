<?php

namespace MusicTools\InstrumentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use MusicTools\InstrumentBundle\Entity\InstrumentType;

/**
 * Instrument Template CRUD Controller
 *
 * @Route("/instrument_types/{instrumentType}/templates")
 */
class InstrumentTemplateController extends Controller
{
    /**
     * List all Templates
     * @param  \MusicTools\InstrumentBundle\Entity\InstrumentType $instrumentType
     * @return array
     *
     * @Route("")
     * @Method("GET")
     */
    public function listAction(InstrumentType $instrumentType)
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository($instrumentType->getTemplate())
            ->findBy(array ('type' => $instrumentType), array ('name' => 'ASC'));

        return new JsonApiResponse($entities);
    }

    /**
     * Display an Template entity
     * @param  \MusicTools\InstrumentBundle\Entity\InstrumentType $instrumentType
     * @param  integer $id
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
     * Retrieve an Instrument entity
     *
     * @param InstrumentType $instrumentType
     * @param  integer $id
     * @return \MusicTools\InstrumentBundle\Entity\Template\AbstractTemplate
     */
    private function getEntity(InstrumentType $instrumentType, $id)
    {
        $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository($instrumentType->getTemplate())->findOneBy( array (
            'id' => $id,
        ));

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find InstrumentTemplate entity.');
        }

        return $entity;
    }
}
