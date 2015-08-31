<?php

namespace MusicTools\MusicianBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

/**
 * Friend controller.
 *
 * @Route("{username}/friend")
 */
class FriendController extends AbstractMusicianController
{
    /**
     * Lists Friends of a musician
     * @return array
     *
     * @Route("/", name="musician_friendship")
     * @Method("GET")
     * @Template()
     */
    public function indexAction(Musician $musician)
    {
        return array (

        );
    }

    /**
     * Creates a new Friend request
     * @return array
     *
     * @Route("/", name="musician_friendship_request")
     * @Method("GET")
     * @Template()
     */
    public function requestAction(Musician $musician)
    {

    }
}