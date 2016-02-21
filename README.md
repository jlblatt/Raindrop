# Raindrop

#### MIDI Visualizer / Player / Time Waster

Ever since I got into coding, I was fascinated by music visualization programs such as [Cthugha](http://www.afn.org/~cthugha/), [G-Force](https://www.soundspectrum.com/g-force/), and [MilkDrop](http://www.geisswerks.com/milkdrop/).  This project is at best a small homage to those programs (and the many more that have come and gone since).  I decided to use MIDI files because:

- having access to the events/messages would allow me to create visualizations directly tied to notes, pitch, velocity, etc...
- representing music as set of instructions reminded me of playing off sheet music long ago in grade school
- it was easier than performing a frequency analysis ;)

The result is a much simpler visualizer than most (I'm a web developer, not a graphics programmer), but one that I hope feels more closely tied to the music.

#### Instructions

Move your mouse around.  Hold your mouse down.  Press any/all keys on your keyboard (space will randomize some effects).  Pretend like you are playing a piano (especially with Mellon Collie).  Have fun :)

## This exists because these exist:

- [MIDI.js](https://github.com/mudcube/MIDI.js)
- [three.js](https://github.com/mrdoob/three.js/)
- [MIDI.js Soundfonts](https://github.com/gleitz/midi-js-soundfonts)

##### Song Credits

- *Mellon Collie and the Infinite Sadness* - The Smashing Pumpkins (via [midiworld.com](http://www.midiworld.com/files/1105/))

##### Instrument Support

By default we only include and use one instrument (acoustic grand piano) for all channels.  For complete instrument support, download the MIDI.js Soundfonts from the link above, and change line 1 of js/app.js to:

    var USE_FULL_SOUNDFONT_LIBRARY = true,

##### License:

MIT.  Free for any reason ✌(-‿-)✌
