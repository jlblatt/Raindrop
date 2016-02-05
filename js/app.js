//set this variable to true after downloading https://github.com/gleitz/midi-js-soundfonts and placing in soundfont directory
var _SOUNDFONT_LIBRARY = false;

var FPS = {last: Date.now(), count: 0},
    MOUSE = {last: Date.now(), e: null};

var SONGS = [
  {path: "midi/mcis.mid", bpm: 86, instruments: ["cello", "cello", "reed_organ", "clarinet"]}
];

var scene, camera, renderer;
var geometry, material, mesh;

window.onload = function() {

  //init user input

  window.onmousemove = function(e) {
    MOUSE.e = e;
    MOUSE.last = Date.now();
  }

  //init three.js

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;

  geometry = new THREE.BoxGeometry( 400, 400, 400 );
  material = new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe: true } );

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  //init MIDI.js

  var song = SONGS[Math.floor(Math.random() * SONGS.length)];

  function playerSetup() {
    MIDI.Player.BPM = song.bpm;

    if(_SOUNDFONT_LIBRARY) {
      for(var i = 0; i < song.instruments.length; i++) {
        MIDI.programChange(i, MIDI.GM.byName[song.instruments[i]].number);
      }
    }

    MIDI.Player.addListener(function(e) {
      //console.log(e.channel + ' / ' + e.note + ' / ' + e.velocity);
      if(e.message = 144) spawn(e);
      else if(e.message = 128) despawn(e);
		});

    MIDI.Player.loadFile(song.path, loop);  //run the animation after file loads
  }

  var opts = {
    soundfontUrl: "soundfont/",
    onsuccess: playerSetup
  };

  if(_SOUNDFONT_LIBRARY) opts.instruments = song.instruments;

  MIDI.loadPlugin(opts);

}

function loop() {

  requestAnimationFrame(loop);

  //play/pause midi on mouse move

  var eventInRange = Date.now() - MOUSE.last < 60000 / MIDI.Player.BPM;

  if(MIDI.Player.playing && !eventInRange) {
    MIDI.Player.pause();
  } else if(!MIDI.Player.playing && eventInRange) {
    MIDI.Player.resume();
  }

  animate();

  renderer.render(scene, camera);

  //fps

  if(Date.now() - FPS.last > 1000) {
    //console.log(FPS.count);
    FPS.count = 0;
    FPS.last = Date.now();
  } else {
    FPS.count++;
  }

}

function animate() {


}

function spawn(e) {
  mesh.rotation.x += 0.1;
  mesh.rotation.y += 0.2;
}

function despawn(e) {

}
