<?php

namespace MusicTools\MusicianBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

use MusicTools\MusicianBundle\Entity\Musician;

/**
 * Friend controller.
 *
 * @Route("/musician{username}/friend")
 */
class FriendController extends AbstractMusicianController
{
    /**
     * Lists Friends of a musician
     * @param  \MusicTools\MusicianBundle\Entity\Musician $musician
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
     * @param  \MusicTools\MusicianBundle\Entity\Musician $musician
     * @return array
     *
     * @Route("/", name="musician_friendship_request")
     * @Method("GET")
     * @Template()
     */
    public function requestAction(Musician $musician)
    {
        return array (

        );
    }

    /**
     * Deletes a Friend
     * @param  \MusicTools\MusicianBundle\Entity\Musician $musician
     * @return array
     *
     * @Route("/", name="musician_friendship_delete")
     * @Method("GET")
     * @Template()
     */
    public function deleteAction(Musician $musician)
    {
        return array (

        );
    }
}