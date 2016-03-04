EFFECTS['box_fireworks'] = {

  SHELLS: [],

  setup: function() {

  },

  spawn: function(note) {
    //http://www.color-hex.com/color-palette/15138
    var randcolors = [0x08ddd7, 0x68cdff, 0xffffff, 0xffc68c, 0xff8746];
    var randcolor = randcolors[Math.floor(Math.random() * randcolors.length)];

    for(var i = 0; i < 18; i++) {

      var material = new THREE.MeshBasicMaterial({color: randcolor, transparent: true, opacity: 1});
      material.blending = THREE.AdditiveBlending;

      var geometry = new THREE.BoxGeometry(7, 7, 7)

      var mesh = new THREE.Mesh(geometry, material);

      mesh.position.x = INPUT.x;
      mesh.position.y = INPUT.y;

      mesh.dx = (Math.random() - 0.5) * 18;
      mesh.dy = (Math.random() - 0.5) * 18;
      mesh.dz = (Math.random() - 0.5) * 18;

      mesh.rotx = (Math.random() - 0.5);
      mesh.roty = (Math.random() - 0.5);
      mesh.rotz = (Math.random() - 0.5);

      SCENE.add(mesh);
      this.SHELLS.push(mesh);
    }
  }, //spawn

  despawn: function(note) {

  },

  click: function() {

  },

  input: function() {

  },

  tick: function() {
    var i = this.SHELLS.length;

    while(i--) {

      var s = this.SHELLS[i];

      s.material.opacity -= MIDI.Player.BPM / 12000;
      
      s.position.x += s.dx;
      s.position.y += s.dy;
      s.position.z += s.dz;
      s.rotation.x += s.rotx;
      s.rotation.y += s.roty;
      s.rotation.z += s.rotz;

      s.dx = s.dx * 0.92;
      s.dy = s.dy * 0.92;
      s.dz = s.dz * 0.92;
      s.rotx = s.rotx * 0.92;
      s.roty = s.roty * 0.92;
      s.rotz = s.rotz * 0.92;

      if(s.material.opacity < 0) {
        SCENE.remove(s);
        this.SHELLS.splice(i, 1);
      }

    }
  },

  randomize: function() {

  }

};
