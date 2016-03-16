# MusicTools

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)
[![Dependency Status](https://gemnasium.com/Elorfin/MusicTools.svg)](https://gemnasium.com/Elorfin/MusicTools)
[![SensioLabsInsight](https://insight.sensiolabs.com/projects/74bd74a9-b6fc-4b4e-9eb6-146748ab49db/mini.png)](https://insight.sensiolabs.com/projects/74bd74a9-b6fc-4b4e-9eb6-146748ab49db)

## Requirements
- PHP > 5.5
- composer
- nodeJS
- npm

## Installation

### Get the server sources
```
$ git clone git@github.com:Elorfin/MusicTools.git
$ cd MusicTools
$ composer update --prefer-source -o
```

### Configure application
```
$ cp app/config/parameters.yml.dist app/config/parameters.yml
$ vi parameters.yml
```

### Create and populate database
```
$ php bin/console doctrine:database:create
$ php bin/console doctrine:schema:update --force
$ php bin/console doctrine:fixtures:load
```

### Get the client sources
```
$ cd web/client
$ npm install
$ bower install
```

### Build client
```
$ grunt build
```