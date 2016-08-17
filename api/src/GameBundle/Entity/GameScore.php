<?php

namespace GameBundle\Entity;

use CommonBundle\Model\UniqueIdentifierTrait;
use UserBundle\Model\OwnerTrait;

/**
 * Score obtained by a User to a Game.
 */
class GameScore implements \JsonSerializable
{
    /*
     * ID
     */
    use UniqueIdentifierTrait;

    /*
     * User
     */
    use OwnerTrait;

    /**
     * Score of the User.
     *
     * @var float
     */
    protected $score;

    /**
     * Game.
     *
     * @var Game
     */
    protected $game;

    /**
     * Get score.
     *
     * @return float
     */
    public function getScore()
    {
        return $this->score;
    }

    /**
     * Set score.
     *
     * @param float $score
     *
     * @return GameScore
     */
    public function setScore($score)
    {
        $this->score = $score;

        return $this;
    }

    /**
     * Get game.
     *
     * @return Game
     */
    public function getGame()
    {
        return $this->game;
    }

    /**
     * Set game.
     *
     * @param Game $game
     *
     * @return GameScore
     */
    public function setGame(Game $game)
    {
        $this->game = $game;

        return $this;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'type' => 'game_scores',
            'attributes' => [
                'score' => $this->score,
            ],
            'relationships' => [
                'user' => [
                    'data' => $this->owner,
                ]
            ],
        ];
    }
}