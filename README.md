# MusicTools

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](LICENSE)
[![Dependency Status](https://gemnasium.com/Elorfin/MusicTools.svg)](https://gemnasium.com/Elorfin/MusicTools)
[![Build Status](https://travis-ci.org/Elorfin/MusicTools.svg?branch=master)](https://travis-ci.org/Elorfin/MusicTools)
[![Scrutinizer](https://scrutinizer-ci.com/g/Elorfin/MusicTools/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Elorfin/MusicTools)
[![SensioLabsInsight](https://insight.sensiolabs.com/projects/74bd74a9-b6fc-4b4e-9eb6-146748ab49db/mini.png)](https://insight.sensiolabs.com/projects/74bd74a9-b6fc-4b4e-9eb6-146748ab49db)

## About

### Introduction
MusicTools is a web application designed to help everyone who is learning an instrument, and more generally music.

It permits to register all your instruments to display notes, scales or chords on a comprehensive visual representation.

It also includes the possibility to organize all the music sheets and resources needed to learn a specific song.

### Why do I need it ?

### Supported instruments
- Guitar
- Bass
- Ukulele
- Recorder
- Piano

## Documentation

[Read the full Documentation](https://github.com/Elorfin/MusicTools/tree/master/doc/index.rst)

## Contributing

### Requirements
- PHP > 5.5
- composer
- nodeJS
- npm

### Installation

#### Get the server sources
```
$ git clone git@github.com:Elorfin/MusicTools.git
$ cd MusicTools
$ composer update --prefer-source -o
```

#### Configure application
```
$ cp app/config/parameters.yml.dist app/config/parameters.yml
$ vi parameters.yml
```

#### Create and populate database
```
$ php bin/console doctrine:database:create
$ php bin/console doctrine:schema:update --force
$ php bin/console doctrine:fixtures:load
```

#### Get the client sources
```
$ npm install
$ bower install
```

#### Build client
```
$ grunt build
```
