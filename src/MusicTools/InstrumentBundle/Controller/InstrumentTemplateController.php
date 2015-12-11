<?php

namespace MusicTools\InstrumentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use MusicTools\InstrumentBundle\Entity\InstrumentType;

/**
 * Instrument Template CRUD Controller
 *
 * @RouteResource("Template")
 */
class InstrumentTemplateController extends Controller implements ClassResourceInterface
{
    /**
     * List all Instruments
     * "get_instruments"     [GET] /instruments
     *
     * @param  \MusicTools\InstrumentBundle\Entity\InstrumentType $instrumentType
     * @return array
     */
    public function cgetAction(InstrumentType $instrumentType)
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository($instrumentType->getTemplate())
            ->findBy(array ('type' => $instrumentType), array ('name' => 'ASC'));

        return $entities;
    }

    /**
     * Display an Instrument entity
     * "get_instrument"      [GET] /instruments/{id}
     * @param  \MusicTools\InstrumentBundle\Entity\InstrumentType $instrumentType
     * @param  integer $id
     * @return mixed
     */
    public function getAction(InstrumentType $instrumentType, $id)
    {
        $entity = $this->getEntity(InstrumentType, $id);

        return $entity;
    }

    /**
     * Retrieve an Instrument entity
     *
     * @param  \MusicTools\InstrumentBundle\Entity\InstrumentType @instrumentType
     * @param  integer $id
     * @return \MusicTools\InstrumentBundle\Entity\Template\AbstractTemplate
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
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
