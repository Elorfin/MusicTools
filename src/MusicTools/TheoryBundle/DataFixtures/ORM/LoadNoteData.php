<?php

namespace MusicTools\TheoryBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use MusicTools\TheoryBundle\Entity\Note;

/**
 * Initializes Notes
 */
class LoadNoteData implements FixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        // C
        $noteC = new Note();
        $noteC->setName('C');

        // C♯ / D♭
        $noteCSharp = new Note();
        $noteCSharp->setName('C♯ / D♭');
        $noteCSharp->setAccidental(true);
        $noteCSharp->setPrevious($noteC);

        // D
        $noteD = new Note();
        $noteD->setName('D');
        $noteD->setPrevious($noteCSharp);

        // D♯ / E♭
        $noteDSharp = new Note();
        $noteDSharp->setName('D♯ / E♭');
        $noteDSharp->setAccidental(true);
        $noteDSharp->setPrevious($noteD);

        // E
        $noteE = new Note();
        $noteE->setName('E');
        $noteE->setPrevious($noteDSharp);

        // F
        $noteF = new Note();
        $noteF->setName('F');
        $noteF->setPrevious($noteE);

        // F♯ / G♭
        $noteFSharp = new Note();
        $noteFSharp->setName('F♯ / G♭');
        $noteFSharp->setAccidental(true);
        $noteFSharp->setPrevious($noteF);

        // G
        $noteG = new Note();
        $noteG->setName('G');
        $noteG->setPrevious($noteFSharp);

        // G♯ / A♭
        $noteGSharp = new Note();
        $noteGSharp->setName('G♯ / A♭');
        $noteGSharp->setAccidental(true);
        $noteGSharp->setPrevious($noteG);

        // A
        $noteA = new Note();
        $noteA->setName('A');
        $noteA->setPrevious($noteGSharp);

        // A♯ / B♭
        $noteASharp = new Note();
        $noteASharp->setName('A♯ / B♭');
        $noteASharp->setAccidental(true);
        $noteASharp->setPrevious($noteA);

        // B
        $noteB = new Note();
        $noteB->setName('B');
        $noteB->setPrevious($noteASharp);
        $noteB->setNext($noteC);

        // Persist all Notes
        $manager->persist($noteC);
        $manager->persist($noteCSharp);
        $manager->persist($noteD);
        $manager->persist($noteDSharp);
        $manager->persist($noteE);
        $manager->persist($noteF);
        $manager->persist($noteFSharp);
        $manager->persist($noteG);
        $manager->persist($noteGSharp);
        $manager->persist($noteA);
        $manager->persist($noteASharp);
        $manager->persist($noteB);

        // Save to DB
        $manager->flush();
    }
}