var _FPS = {last: Date.now(), count: 0},
    _BEAT = {length: null},
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

      _PLAYER.addListener(function(e) {
        //console.log(e.channel + ' / ' + e.note + ' / ' + e.velocity);
        spawn();
			});

      loop();
    }
  });

}

function loop() {

  requestAnimationFrame(loop);

  //play/pause midi on mouse move

  var eventInRange = Date.now() - _MOUSE.last < _BEAT.length;

  if(_PLAYER.playing && !eventInRange) {
    _PLAYER.pause();
  } else if(!_PLAYER.playing && eventInRange) {
    _PLAYER.resume();
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

function animate(adv) {


}

function spawn() {
  mesh.rotation.x += 0.1;
  mesh.rotation.y += 0.2;
}
