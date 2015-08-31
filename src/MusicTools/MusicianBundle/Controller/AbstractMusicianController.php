<?php

namespace MusicTools\MusicianBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Elorfin\UserBundle\Entity\User;

abstract class AbstractMusicianController extends Controller
{
    /**
     * Get the Musician entity from the User
     * @param  User $user
     * @return \MusicTools\MusicianBundle\Entity\Musician
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    protected function getMusicianFromUser(User $user)
    {
        $entity = $this->container->get('doctrine.orm.entity_manager')->getRepository('MusicToolsMusicianBundle:Musician')->findOneByUser(array (
            'user' => $user
        ));

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Musician entity.');
        }

        return $entity;
    }
}