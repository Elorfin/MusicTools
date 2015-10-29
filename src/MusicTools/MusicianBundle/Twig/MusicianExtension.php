<?php

namespace MusicTools\MusicianBundle\Twig;

use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class MusicianExtension extends \Twig_Extension
{
    /**
     * @var \Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface
     */
    protected $tokenStorage;

    /**
     * @var \Doctrine\Common\Persistence\ObjectManager
     */
    protected $om;

    /**
     * Class constructor
     * @param \Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface $tokenStorage
     * @param \Doctrine\Common\Persistence\ObjectManager                                          $objectManager
     */
    public function __construct(
        TokenStorageInterface $tokenStorage,
        ObjectManager         $objectManager)
    {
        $this->tokenStorage = $tokenStorage;
        $this->om           = $objectManager;
    }

    public function getName()
    {
        return 'musician_extension';
    }

    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('get_current_musician', array($this, 'getCurrentMusician')),
        );
    }

    public function getCurrentMusician()
    {
        // Get logged User from session
        $user = $this->tokenStorage->getToken()->getUser();

        // Find Musician from User entity
        $entity = $this->om->getRepository('MusicToolsMusicianBundle:Musician')->findOneByUser(array (
            'user' => $user,
        ));

        if (empty($entity)) {
            throw new NotFoundHttpException('Unable to find Musician entity.');
        }

        return $entity;
    }
}