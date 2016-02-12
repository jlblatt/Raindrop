var _USE_FULL_SOUNDFONT_LIBRARY = false; //set this variable to true after downloading https://github.com/gleitz/midi-js-soundfonts and placing in soundfont directory

var FPS = {show: false, last: Date.now(), count: 0},
    NOTE = {last: Date.now(), next: Date.now()},
    INPUT = {last: Date.now(), e: null};

var EFFECTS = {};

var SONG = [
  {
    path: "midi/mellon-collie-and-the-infinite-sadness.mid",
    bpm: 86,
    effectMapping: {
      globals: ['test'],
      channels: []
    }
  }
];

var SCENE, CAMERA, RENDERER;

////////////////////////////////
// INIT
////////////////////////////////

window.onload = function() {

  //init three.js

  SCENE = new THREE.Scene();

  CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  CAMERA.position.z = 600;

  RENDERER = new THREE.WebGLRenderer();
  RENDERER.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(RENDERER.domElement);

  //setup song and effect mapping

  SONG = SONG[Math.floor(Math.random() * SONG.length)];

  if(!SONG.effectMapping.hasOwnProperty('channels')) SONG.effectMapping.channels = [];
  if(!SONG.effectMapping.hasOwnProperty('globals')) SONG.effectMapping.globals = [];

  for(var i = 0; i < SONG.effectMapping.globals.length; i++) {
    if(EFFECTS.hasOwnProperty(SONG.effectMapping.globals[i])) {
      SONG.effectMapping.globals[i] = EFFECTS[SONG.effectMapping.globals[i]];
    }
  }

  for(var i = 0; i < SONG.effectMapping.channels.length; i++) {
    if(EFFECTS.hasOwnProperty(SONG.effectMapping.channels[i])) {
      SONG.effectMapping.channels[i] = EFFECTS[SONG.effectMapping.channels[i]];
    }
  }

  //init MIDI.js

  MIDI.Player.BPM = SONG.bpm ? SONG.bpm : 100;

  MIDI.loadPlugin({
    soundfontUrl: "soundfont/",
    onsuccess: function() {
      MIDI.Player.loadFile(SONG.path, function() {

        //if we are using the full soundfont library, load the instruments needed for this song

        if(_USE_FULL_SOUNDFONT_LIBRARY) {
          var instruments = MIDI.Player.getFileInstruments();
          var instrumentsToLoad = instruments.length;
          for(let i = 0; i < instruments.length; i++) {
            var channel = Math.random();
            MIDI.loadResource({
              instrument: instruments[i],
              onsuccess: function() {
                MIDI.programChange(i, MIDI.GM.byName[instruments[i]].number);
                instrumentsToLoad--;
                if(instrumentsToLoad == 0) appReady();
              }
            });
          }
        }

        else appReady();

      });
    }
  });

  //init user/midi input and run the animation after file (and possibly all instruments) load

  function appReady() {

    MIDI.Player.addListener(function(e) {
      NOTE.last = Date.now();

      var eMap = SONG.effectMapping.channels;
      if(eMap.length > e.channel && eMap[e.channel]) {
        if(e.message == 144 && eMap[e.channel].hasOwnProperty('spawn')) {
          eMap[e.channel].spawn(e);
        } else if(e.message == 128 && eMap[e.channel].hasOwnProperty('despawn')) {
          eMap[e.channel].despawn(e);
        }
      }

      for(var i = 0; i < SONG.effectMapping.globals.length; i++) {
        if(e.message == 144 && SONG.effectMapping.globals[i].hasOwnProperty('spawn')) {
          SONG.effectMapping.globals[i].spawn(e);
        } else if(e.message == 128 && SONG.effectMapping.globals[i].hasOwnProperty('despawn')) {
          SONG.effectMapping.globals[i].despawn(e);
        }
      }
    });

    function inputEvent(e) {
      INPUT.e = e;
      INPUT.last = Date.now();

      if(!MIDI.Player.playing) {
        MIDI.Player.resume();
      }

      for(var i = 0; i < SONG.effectMapping.channels.length; i++) {
        if(SONG.effectMapping.channels[i] && SONG.effectMapping.channels[i].hasOwnProperty('input')) {
          SONG.effectMapping.channels[i].input();
        }
      }

      for(var i = 0; i < SONG.effectMapping.globals.length; i++) {
        if(SONG.effectMapping.globals[i] && SONG.effectMapping.globals[i].hasOwnProperty('input')) {
          SONG.effectMapping.globals[i].input();
        }
      }
    }

    window.onmousemove = inputEvent;

    window.ontouchmove = function(e) {
      inputEvent(e);
      INPUT.e.clientX = e.touches[0].clientX;
      INPUT.e.clientY = e.touches[0].clientY;
    }

    window.onkeypress = function(e) {
      inputEvent(e);
      INPUT.e.clientX = Math.floor(Math.random() * window.innerWidth);
      INPUT.e.clientY = Math.floor(Math.random() * window.innerHeight);
      //return false;
    }

    loop();

  }

}

////////////////////////////////
// MAIN LOOP
////////////////////////////////

function loop() {

  requestAnimationFrame(loop);

  //pause midi if mouse has been idle and there have bee notes recent enough

  if(MIDI.Player.playing && (Date.now() - INPUT.last) > (60000 / MIDI.Player.BPM) && NOTE.last > (INPUT.last + (60000 / MIDI.Player.BPM))) {
    MIDI.Player.pause();
  }

  //simulate click track events
  if(MIDI.Player.playing && Date.now() > NOTE.next) {
    NOTE.next = Date.now() + (60000 / (MIDI.Player.BPM * 2));

    for(var i = 0; i < SONG.effectMapping.channels.length; i++) {
      if(SONG.effectMapping.channels[i] && SONG.effectMapping.channels[i].hasOwnProperty('click')) {
        SONG.effectMapping.channels[i].click();
      }
    }

    for(var i = 0; i < SONG.effectMapping.globals.length; i++) {
      if(SONG.effectMapping.globals[i] && SONG.effectMapping.globals[i].hasOwnProperty('click')) {
        SONG.effectMapping.globals[i].click();
      }
    }
  }

  //dispatch tick events
  for(var i = 0; i < SONG.effectMapping.channels.length; i++) {
    if(SONG.effectMapping.channels[i] && SONG.effectMapping.channels[i].hasOwnProperty('tick')) {
      SONG.effectMapping.channels[i].tick();
    }
  }

  for(var i = 0; i < SONG.effectMapping.globals.length; i++) {
    if(SONG.effectMapping.globals[i] && SONG.effectMapping.globals[i].hasOwnProperty('tick')) {
      SONG.effectMapping.globals[i].tick();
    }
  }

  //render

  RENDERER.render(SCENE, CAMERA);

  //fps

  if(FPS.show && Date.now() - FPS.last > 1000) {
    console.log(FPS.count);
    FPS.count = 0;
    FPS.last = Date.now();
  } else if(FPS.show) {
    FPS.count++;
  }

}
