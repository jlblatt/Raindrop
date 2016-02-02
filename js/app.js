var _BEAT = {length: null, last: null, delay: null, spawn: Date.now()},
    _MOUSE = {last: Date.now(), e: null},
    _PLAYER;

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

  geometry = new THREE.BoxGeometry( 200, 200, 200 );
  material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

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
      _PLAYER = MIDI.Player;
      _BEAT.length = 60000 / (_PLAYER.BPM * 4);
      _PLAYER.loadFile(_SONG, _PLAYER.start);
      loop();
    }
  });

}

function loop() {

  _BEAT.delay = _BEAT.last - Date.now();
  _BEAT.last = Date.now();

  var eventInRange = Date.now() - _MOUSE.last < _BEAT.length;

  if(_PLAYER.playing && !eventInRange) {
    _PLAYER.pause();
  } else if(_PLAYER.playing && eventInRange) {
    if(Date.now() - _BEAT.delay - _BEAT.spawn > _BEAT.length) {
      _BEAT.spawn = Date.now();
      animate(true);
    }
  } else if(!_PLAYER.playing && !eventInRange) {
    //this time we do nothing
  } else if(!_PLAYER.playing && eventInRange) {
    _PLAYER.resume();
  }

  requestAnimationFrame(loop);

  if(_PLAYER.playing) {
    animate(false);
  }

  renderer.render( scene, camera );

}

function animate(adv) {
  if(adv) {
    mesh.rotation.x += 0.1;
    mesh.rotation.y += 0.2;
  }
}
