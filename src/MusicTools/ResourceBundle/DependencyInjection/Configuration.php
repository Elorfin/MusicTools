<?php

namespace MusicTools\ResourceBundle\DependencyInjection;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html#cookbook-bundles-extension-config-class}
 */
class Configuration implements ConfigurationInterface
{
    protected $rootDir;

    public function __construct($rootDir)
    {
        $this->rootDir = $rootDir;
    }

    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('music_tools_resource');

        // Define default upload directory
        $defaultUploadDir = $this->rootDir . DIRECTORY_SEPARATOR . '';

        $rootNode
            ->children()
                ->scalarNode('upload_dir')->defaultValue($defaultUploadDir)->end()
            ->end()
        ;

        return $treeBuilder;
    }
}