<?php

namespace AdvertisementBundle\Controller;

use AdvertisementBundle\Entity\Advertisement;
use Elorfin\JsonApiBundle\Response\JsonApiResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Advertisement controller.
 *
 * @Route("/advert")
 */
class AdvertisementController extends Controller
{
    /**
     * Lists all Advertisement entities.
     * @return JsonApiResponse
     *
     * @Route("/")
     * @Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container
            ->get('doctrine.orm.entity_manager')
            ->getRepository('AdvertisementBundle:Advertisement')
            ->findAll();

        return new JsonApiResponse($entities);
    }

    /**
     * Render a Advertisement entity
     * @param  Advertisement $advertisement
     * @return JsonApiResponse
     *
     * @Route("/{id}")
     * @Method("GET")
     */
    public function getAction(Advertisement $advertisement)
    {
        return new JsonApiResponse($advertisement);
    }
}
