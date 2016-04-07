var USE_FULL_SOUNDFONT_LIBRARY = true, //set this variable to true after downloading https://github.com/gleitz/midi-js-soundfonts and placing in soundfont directory

  FPS = {show: false, last: Date.now(), count: 0},
  NOTE = {last: Date.now(), next: Date.now()},
  INPUT = {last: Date.now(), e: null, x: null, y: null, mousedown: false, cursor: null},
  EFFECTS = {},
  SONG, THEME, THEMEPTR, SCENE, CAMERA, RENDERER;

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

  //setup cursor

  var c_mat = new THREE.MeshBasicMaterial({color: 0xdddddd});
  var c_geo = new THREE.CircleGeometry(1, 24);
  INPUT.cursor = new THREE.Mesh(c_geo, c_mat);
  SCENE.add(INPUT.cursor);

  //setup theme, song, and effect mapping

  THEMEPTR = Math.floor(Math.random() * THEMES.length);
  THEME = THEMES[THEMEPTR];

  SONG = SONGS[Math.floor(Math.random() * SONGS.length)];
  SONG = SONGS[4];

  if(!SONG.effectMapping.hasOwnProperty('channels')) SONG.effectMapping.channels = {};
  if(!SONG.effectMapping.hasOwnProperty('globals')) SONG.effectMapping.globals = [];

  for(var i = 0; i < SONG.effectMapping.globals.length; i++) {
    if(EFFECTS.hasOwnProperty(SONG.effectMapping.globals[i])) {
      SONG.effectMapping.globals[i] = EFFECTS[SONG.effectMapping.globals[i]];
      if(SONG.effectMapping.globals[i].hasOwnProperty('setup')) SONG.effectMapping.globals[i].setup();
    }
  }

  for(var i in SONG.effectMapping.channels) {
    if(EFFECTS.hasOwnProperty(SONG.effectMapping.channels[i])) {
      SONG.effectMapping.channels[i] = EFFECTS[SONG.effectMapping.channels[i]];
      if(SONG.effectMapping.channels[i].hasOwnProperty('setup')) SONG.effectMapping.channels[i].setup();
    }
  }

  //init MIDI.js

  if(SONG.hasOwnProperty('bpm')) MIDI.Player.BPM = SONG.bpm;

  MIDI.loadPlugin({
    soundfontUrl: "soundfont/",
    onsuccess: function() {
      MIDI.Player.loadFile(SONG.path, function() {

        //seek?
        if(SONG.hasOwnProperty('wadsworth')) MIDI.Player.currentTime = SONG.wadsworth * 1000;

        //if we are using the full soundfont library, load the instruments needed for this song

        if(USE_FULL_SOUNDFONT_LIBRARY) {
          var instruments = MIDI.Player.getFileInstruments();
          var instrumentsToLoad = instruments.length;
          for(var i = 0; i < instruments.length; i++) {
            var channel = i;
            MIDI.loadResource({
              instrument: instruments[i],
              onsuccess: function(c) {
                MIDI.programChange(c, MIDI.GM.byName[instruments[c]].number);
                instrumentsToLoad--;
                if(instrumentsToLoad == 0) appReady();
              } (channel)
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
      if(e.hasOwnProperty('channel') && eMap[e.channel]) {
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
      INPUT.x = ((e.clientX / window.innerWidth) - 0.5) * window.innerWidth;
      INPUT.y = ((e.clientY / window.innerHeight) - 0.5) * -window.innerHeight;
      INPUT.cursor.position.x = INPUT.x;
      INPUT.cursor.position.y = INPUT.y;
      INPUT.e = e;
      INPUT.last = Date.now();


      if(!MIDI.Player.playing) {
        MIDI.Player.resume();
      }

      for(var i in SONG.effectMapping.channels) {
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

    window.onmousedown = function(e) {
      INPUT.mousedown = true;
      inputEvent(e);
    }

    window.onmouseup = function(e) {
      INPUT.mousedown = false;
    }

    window.ontouchmove = function(e) {
      e.clientX = e.touches[0].clientX;
      e.clientY = e.touches[0].clientY;
      inputEvent(e);
    }

    window.onkeypress = function(e) {
      e.clientX = Math.floor(Math.random() * window.innerWidth);
      e.clientY = Math.floor(Math.random() * window.innerHeight);
      inputEvent(e);

      if(e.which == 32) {
        //change theme
        THEME = THEMES[THEMEPTR++ % THEMES.length];
        
        //dispatch randomize events
        for(var i in SONG.effectMapping.channels) {
          if(SONG.effectMapping.channels[i] && SONG.effectMapping.channels[i].hasOwnProperty('randomize')) {
            SONG.effectMapping.channels[i].randomize();
          }
        }

        for(var i = 0; i < SONG.effectMapping.globals.length; i++) {
          if(SONG.effectMapping.globals[i] && SONG.effectMapping.globals[i].hasOwnProperty('randomize')) {
            SONG.effectMapping.globals[i].randomize();
          }
        }
      }

      //return false;

    }

    loop();

  }

}

////////////////////////////////
// MAIN LOOP
////////////////////////////////

function loop(time) {

  requestAnimationFrame(loop);

  TWEEN.update(time);

  //pause midi if mouse has been idle and there have been notes recent enough

  if(MIDI.Player.playing && !INPUT.mousedown && (Date.now() - INPUT.last) > (60000 / MIDI.Player.BPM) && NOTE.last > (INPUT.last + (60000 / MIDI.Player.BPM))) {
    MIDI.Player.pause();
  }

  //simulate click track events (32nd notes in 4/4)
  if(MIDI.Player.playing && Date.now() > NOTE.next) {
    NOTE.next = Date.now() + (60000 / (MIDI.Player.BPM * 8));

    for(var i in SONG.effectMapping.channels) {
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
  for(var i in SONG.effectMapping.channels) {
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
