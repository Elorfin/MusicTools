<?php

namespace MusicTools\InstrumentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Routing\ClassResourceInterface;

/**
 * Instrument CRUD Controller
 */
class InstrumentController extends Controller implements ClassResourceInterface
{
    /**
     * List all Instruments
     * "get_instruments"     [GET] /instruments
     *
     * @return array
     */
    public function cgetAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('MusicToolsInstrumentBundle:Instrument')
            ->findBy(array (), array ('model' => 'ASC'));

        return $entities;
    }

    /**
     * Display an Instrument entity
     * "get_instrument"      [GET] /instruments/{id}
     * @param  integer $id
     * @return mixed
     */
    public function getAction($id)
    {
        $entity = $this->getEntity($id);

        return $entity;
    }

    /**
     * Retrieve an Instrument entity
     *
     * @param  integer $id
     * @return \MusicTools\InstrumentBundle\Entity\Instrument
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    private function getEntity($id)
    {
        $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsInstrumentBundle:Instrument')->findOneBy( array (
            'id' => $id,
        ));

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Instrument entity.');
        }

        return $entity;
    }
}
