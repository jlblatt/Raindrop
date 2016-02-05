var _USE_FULL_SOUNDFONT_LIBRARY = false; //set this variable to true after downloading https://github.com/gleitz/midi-js-soundfonts and placing in soundfont directory

var FPS = {last: Date.now(), count: 0},
    MOUSE = {last: Date.now(), e: null};

var SONGS = [
  {path: "midi/mcis.mid", bpm: 86, instruments: ["acoustic_grand_piano", "cello", "reed_organ", "clarinet"]}
];

var SCENE, CAMERA, RENDERER;

////////////////////////////////
// INIT
////////////////////////////////

window.onload = function() {

  //init three.js

  SCENE = new THREE.Scene();

  CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  CAMERA.position.z = 650;

  RENDERER = new THREE.WebGLRenderer();
  RENDERER.setSize(window.innerWidth, window.innerHeight);

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

      window.onkeypress = function(e) {
        MOUSE.e = e;
        MOUSE.e.clientX = Math.floor(Math.random() * window.innerWidth);
        MOUSE.e.clientY = Math.floor(Math.random() * window.innerHeight);
        MOUSE.last = Date.now();

        if(!MIDI.Player.playing) {
          MIDI.Player.resume();
        }

        return false;
      }

      //skip ahead to test
      //MIDI.Player.currentTime = 60000;

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

  if(MIDI.Player.playing && (Date.now() - MOUSE.last) > (60000 / MIDI.Player.BPM * 2)) {
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

    //need to do this properly at some point

    var x = ((MOUSE.e.clientX / window.innerWidth) - .5) * window.innerWidth;
    var y = ((MOUSE.e.clientY / window.innerHeight) - .5) * -window.innerHeight;

    if(note.channel == 0) {
      var size = (note.velocity + note.note) * Math.random() * 2;
      var b = Math.floor(192 + (Math.random() * 64));
      var r = b - 64;
      var g = b - 64;
      var opacity = .70 + (Math.random() * .2);

      var material = new THREE.MeshBasicMaterial({color: "rgb(" + r + ", " + g + ", " + b + ")", transparent: true, opacity: opacity});
      var geometry = new THREE.CircleGeometry(size, 72);
      geometry.translate(x, y, 0);
      var mesh = new THREE.Mesh(geometry, material);

      SCENE.add(mesh);

      function drop(mesh) {
        mesh.material.opacity -= .0125;
        if(mesh.material.opacity < 0) {
          SCENE.remove(mesh);
        } else {
          setTimeout(function(){
            drop(mesh);
          }, 16);
        }
      }

      drop(mesh);
    }

    else if(note.channel == 1) {
      var size = (note.velocity + note.note) * Math.random() * 4;
      var r = Math.floor(128 + (Math.random() * 128));
      var g = r - 64;
      var b = r - 64;
      var opacity = .40 + (Math.random() * .2);

      var material = new THREE.MeshBasicMaterial({color: "rgb(" + r + ", " + g + ", " + b + ")", transparent: true, opacity: opacity, wireframe: true});
      var geometry = new THREE.CircleGeometry(size, 24);
      var mesh = new THREE.Mesh(geometry, material);

      SCENE.add(mesh);

      function drop(mesh) {
        mesh.material.opacity -= .003;
        mesh.rotation.z -= .03;
        if(mesh.material.opacity < 0) {
          SCENE.remove(mesh);
        } else {
          setTimeout(function(){
            drop(mesh);
          }, 16);
        }
      }

      drop(mesh);
    }

    else if(note.channel == 2){
      var size = (note.velocity + note.note) * Math.random() * 3;
      var g = Math.floor(128 + (Math.random() * 128));
      var r = g - 64;
      var b = g - 64;
      var opacity = .40 + (Math.random() * .2);

      var material = new THREE.MeshBasicMaterial({color: "rgb(" + r + ", " + g + ", " + b + ")", transparent: true, opacity: opacity, wireframe: true});
      var geometry = new THREE.CircleGeometry(size, 36);
      geometry.translate(x, y, 0);
      var mesh = new THREE.Mesh(geometry, material);

      SCENE.add(mesh);

      function drop(mesh) {
        mesh.material.opacity -= .003;
        mesh.rotation.z += .03;
        if(mesh.material.opacity < 0) {
          SCENE.remove(mesh);
        } else {
          setTimeout(function(){
            drop(mesh);
          }, 16);
        }
      }

      drop(mesh);
    }

    else {
      var size = (note.velocity + note.note) * Math.random();
      var g = Math.floor(128 + (Math.random() * 128));
      var r = g;
      var b = g - 64;
      var opacity = .80 + (Math.random() * .2);

      var material = new THREE.MeshBasicMaterial({color: "rgb(" + r + ", " + g + ", " + b + ")", transparent: true, opacity: opacity});
      var geometry = new THREE.CircleGeometry(size, 36);
      geometry.translate(x, y, 0);
      var mesh = new THREE.Mesh(geometry, material);

      SCENE.add(mesh);

      function drop(mesh) {
        mesh.material.opacity -= .002;
        mesh.scale.x += .01;
        mesh.scale.y += .01;
        if(mesh.material.opacity < 0) {
          SCENE.remove(mesh);
        } else {
          setTimeout(function(){
            drop(mesh);
          }, 16);
        }
      }

      drop(mesh);
    }

}

////////////////////////////////
// NOTE RELEASES
////////////////////////////////

function despawn(e) {

}
