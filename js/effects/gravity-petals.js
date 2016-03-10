EFFECTS['gravity_petals'] = {

  PETALS: [],

  spawn: function(note) {

    for(var i = 0; i < 4; i++) {
      var randcolor = THEME[Math.floor(Math.random() * THEME.length)];

      var material = new THREE.MeshBasicMaterial({color: randcolor, transparent: true, opacity: 1});
      var geometry = new THREE.CylinderGeometry(5, 5, 1, 24);
      var mesh = new THREE.Mesh(geometry, material);

      mesh.position.x = INPUT.x;
      mesh.position.y = INPUT.y;

      mesh.dx = (Math.random() - .5) * 5;
      mesh.dy = (Math.random() - .5) * 5;
      mesh.dz = (Math.random() - .5) * 5;

      mesh.rotx = (Math.random() - .5) * 1;
      mesh.roty = (Math.random() - .5) * 1;
      mesh.rotz = (Math.random() - .5) * 1;

      SCENE.add(mesh);
      this.PETALS.push(mesh);
    }
    
  }, //spawn

  despawn: function(note) {

  },

  click: function() {

  },

  input: function() {

  },

  tick: function() {

    var i = this.PETALS.length;

    while(i--) {

      var p = this.PETALS[i];

      p.material.opacity -= MIDI.Player.BPM / 20000;
      p.position.x += p.dx;
      p.position.y += p.dy;
      p.position.z += p.dz;
      p.rotation.x += p.rotx;
      p.rotation.y += p.roty;
      p.rotation.z += p.rotz;

      p.dy -= .15;

      if(p.material.opacity < 0) {
        SCENE.remove(p);
        this.PETALS.splice(i, 1);
      }

    }

  }, //tick

  randomize: function() {

  }

};
