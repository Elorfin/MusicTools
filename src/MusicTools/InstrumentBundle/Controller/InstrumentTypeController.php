<?php

namespace MusicTools\InstrumentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\Controller\Annotations\RouteResource;

/**
 * Instrument Type CRUD Controller
 *
 * @RouteResource("InstrumentType")
 */
class InstrumentTypeController extends Controller implements ClassResourceInterface
{
    /**
     * List all Instrument Types
     * "get_instrument_types"     [GET] /instrument_types
     *
     * @return array
     */
    public function cgetAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('MusicToolsInstrumentBundle:InstrumentType')
            ->findBy(array (), array ('name' => 'ASC'));

        return $entities;
    }

    /**
     * Display an Instrument Type entity
     * "get_instrument_type"      [GET] /instrument_types/{id}
     *
     * @param  integer $id
     * @return mixed
     */
    public function getAction($id)
    {
        $entity = $this->getEntity($id);

        return $entity;
    }

    /**
     * Retrieve an Instrument Type entity
     *
     * @param  integer $id
     * @return \MusicTools\InstrumentBundle\Entity\Instrument
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    private function getEntity($id)
    {
        $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsInstrumentBundle:InstrumentType')->findOneBy( array (
            'id' => $id,
        ));

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Instrument Type entity.');
        }

        return $entity;
    }
}
