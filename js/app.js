var _FPS = {last: Date.now(), count: 0},
    _BEAT = {length: null},
    _MOUSE = {last: Date.now(), e: null};

var _SONGS = [
  {fn: "mcis.mid", bpm: 90}
];

var scene, camera, renderer;
var geometry, material, mesh;

window.onload = function() {

  //init user input

  window.onmousemove = function(e) {
    _MOUSE.e = e;
    _MOUSE.last = Date.now();
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

  MIDI.loadPlugin({
    soundfontUrl: "soundfont/",
    onprogress: function(state, progress) {

    },
    onsuccess: function() {
      var song = _SONGS[Math.floor(Math.random() * _SONGS.length)];

      MIDI.Player.BPM = song.bpm;
      _BEAT.length = 60000 / (MIDI.Player.BPM * 4);
      MIDI.Player.loadFile('midi/' + song.fn, MIDI.Player.start);

      MIDI.Player.addListener(function(e) {
        //console.log(e.channel + ' / ' + e.note + ' / ' + e.velocity);
        if(e.message = 144) spawn();
        else if(e.message = 128) despawn();
			});

      loop();
    }
  });

}

function loop() {

  requestAnimationFrame(loop);

  //play/pause midi on mouse move

  var eventInRange = Date.now() - _MOUSE.last < _BEAT.length * 4;

  if(MIDI.Player.playing && !eventInRange) {
    MIDI.Player.pause();
  } else if(!MIDI.Player.playing && eventInRange) {
    MIDI.Player.resume();
  }

  animate();

  renderer.render(scene, camera);

  //fps

  if(Date.now() - _FPS.last > 1000) {
    //console.log(_FPS.count);
    _FPS.count = 0;
    _FPS.last = Date.now();
  } else {
    _FPS.count++;
  }

}

function animate() {


}

function spawn() {
  mesh.rotation.x += 0.1;
  mesh.rotation.y += 0.2;
}

function despawn() {

}
