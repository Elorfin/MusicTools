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
        $noteC->setSharpName('C');
        $noteC->setFlatName('C');
        $noteC->setValue(3);
        $noteC->setColor('#006cb7');

        // C♯ / D♭
        $noteCSharp = new Note();
        $noteCSharp->setSharpName('C♯');
        $noteCSharp->setFlatName('D♭');
        $noteCSharp->setValue(4);
        $noteCSharp->setColor('#008e83');
        $noteCSharp->setAccidental(true);
        $noteCSharp->setPrevious($noteC);

        // D
        $noteD = new Note();
        $noteD->setSharpName('D');
        $noteD->setFlatName('D');
        $noteD->setValue(5);
        $noteD->setColor('#00854a');
        $noteD->setPrevious($noteCSharp);

        // D♯ / E♭
        $noteDSharp = new Note();
        $noteDSharp->setSharpName('D♯');
        $noteDSharp->setFlatName('E♭');
        $noteDSharp->setValue(6);
        $noteDSharp->setColor('#7fb439');
        $noteDSharp->setAccidental(true);
        $noteDSharp->setPrevious($noteD);

        // E
        $noteE = new Note();
        $noteE->setSharpName('E');
        $noteE->setFlatName('E');
        $noteE->setValue(7);
        $noteE->setColor('#fdb813');
        $noteE->setPrevious($noteDSharp);

        // F
        $noteF = new Note();
        $noteF->setSharpName('F');
        $noteF->setFlatName('F');
        $noteF->setValue(8);
        $noteF->setColor('#584742');
        $noteF->setPrevious($noteE);

        // F♯ / G♭
        $noteFSharp = new Note();
        $noteFSharp->setSharpName('F♯');
        $noteFSharp->setFlatName('G♭');
        $noteFSharp->setValue(9);
        $noteFSharp->setColor('#c15e20');
        $noteFSharp->setAccidental(true);
        $noteFSharp->setPrevious($noteF);

        // G
        $noteG = new Note();
        $noteG->setSharpName('G');
        $noteG->setFlatName('G');
        $noteG->setValue(10);
        $noteG->setColor('#f58220');
        $noteG->setPrevious($noteFSharp);

        // G♯ / A♭
        $noteGSharp = new Note();
        $noteGSharp->setSharpName('G♯');
        $noteGSharp->setFlatName('A♭');
        $noteGSharp->setValue(11);
        $noteGSharp->setColor('#f04e46');
        $noteGSharp->setAccidental(true);
        $noteGSharp->setPrevious($noteG);

        // A
        $noteA = new Note();
        $noteA->setSharpName('A');
        $noteA->setFlatName('A');
        $noteA->setValue(0);
        $noteA->setColor('#8f0000');
        $noteA->setPrevious($noteGSharp);

        // A♯ / B♭
        $noteASharp = new Note();
        $noteASharp->setSharpName('A♯');
        $noteASharp->setFlatName('B♭');
        $noteASharp->setValue(1);
        $noteASharp->setColor('#a23e97');
        $noteASharp->setAccidental(true);
        $noteASharp->setPrevious($noteA);

        // B
        $noteB = new Note();
        $noteB->setSharpName('B');
        $noteB->setFlatName('B');
        $noteB->setValue(2);
        $noteB->setColor('#6a489d');
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