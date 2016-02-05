var _USE_FULL_SOUNDFONT_LIBRARY = false; //set this variable to true after downloading https://github.com/gleitz/midi-js-soundfonts and placing in soundfont directory

var FPS = {last: Date.now(), count: 0},
    MOUSE = {last: Date.now(), e: null};

var SONGS = [
  {path: "midi/mcis.mid", bpm: 86, instruments: ["cello", "cello", "reed_organ", "clarinet"]}
];

var SCENE, CAMERA, RENDERER;

////////////////////////////////
// INIT
////////////////////////////////

window.onload = function() {

  //init three.js

  SCENE = new THREE.Scene();

  CAMERA = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  CAMERA.position.z = 1000;

  RENDERER = new THREE.WebGLRenderer();
  RENDERER.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( RENDERER.domElement );

  //init MIDI.js

  var song = SONGS[Math.floor(Math.random() * SONGS.length)];

  function playerSetup() {
    MIDI.Player.BPM = song.bpm;

    if(_USE_FULL_SOUNDFONT_LIBRARY) {
      for(var i = 0; i < song.instruments.length; i++) {
        MIDI.programChange(i, MIDI.GM.byName[song.instruments[i]].number);
      }
    }

    MIDI.Player.addListener(function(e) {
      //console.log(e.channel + ' / ' + e.note + ' / ' + e.velocity);
      if(e.message = 144) spawn(e);
      else if(e.message = 128) despawn(e);
		});

    MIDI.Player.loadFile(song.path, function() {

      //init user input and run the animation after file loads

      window.onmousemove = function(e) {
        MOUSE.e = e;
        MOUSE.last = Date.now();

        if(!MIDI.Player.playing) {
          MIDI.Player.resume();
        }
      }

      loop();

    });
  }

  var opts = {
    soundfontUrl: "soundfont/",
    onsuccess: playerSetup
  };

  if(_USE_FULL_SOUNDFONT_LIBRARY) opts.instruments = song.instruments;

  MIDI.loadPlugin(opts);

}

////////////////////////////////
// MAIN LOOP
////////////////////////////////

function loop() {

  requestAnimationFrame(loop);

  //pause midi if mouse has been idle

  if(MIDI.Player.playing && Date.now() - MOUSE.last > 60000 / MIDI.Player.BPM) {
    MIDI.Player.pause();
  }

  //update our scene

  update();

  //render

  RENDERER.render(SCENE, CAMERA);

  //fps

  if(Date.now() - FPS.last > 1000) {
    //console.log(FPS.count);
    FPS.count = 0;
    FPS.last = Date.now();
  } else {
    FPS.count++;
  }

}

////////////////////////////////
// SCENE UPDATE
////////////////////////////////

function update() {


}

////////////////////////////////
// NOTE HITS
////////////////////////////////

function spawn(note) {

    //no need to do expensive raycasting here since cursor is invisible

    var size = Math.floor(Math.random() * 640);
    var r = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);

    var material = new THREE.MeshBasicMaterial({ color: "rgb(" + r + ", " + g + ", " + b + ")", wireframe: true });
    var circle = new THREE.CircleGeometry(size, 24);
    var mesh = new THREE.Mesh(circle, material);
    //mesh.rotation.x += Math.random();
    //mesh.rotation.y += Math.random();

    SCENE.add(mesh);


}

////////////////////////////////
// NOTE RELEASES
////////////////////////////////

function despawn(e) {

}
