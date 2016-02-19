EFFECTS['gravity_petals'] = {

  KERNALS: [],

  spawn: function(note) {

    for(var i = 0; i < 4; i++) {
      var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 1});
      //var geometry = new THREE.CircleGeometry(5, 24);
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
      this.KERNALS.push(mesh);
    }
  }, //spawn

  despawn: function(note) {

  },

  click: function() {

  },

  input: function() {

  },

  tick: function() {

    var i = this.KERNALS.length;

    while(i--) {

      var k = this.KERNALS[i];

      k.material.opacity -= MIDI.Player.BPM / 20000;
      k.position.x += k.dx;
      k.position.y += k.dy;
      k.position.z += k.dz;
      k.rotation.x += k.rotx;
      k.rotation.y += k.roty;
      k.rotation.z += k.rotz;

      k.dy -= .15;

      if(k.material.opacity < 0) {
        SCENE.remove(k);
        this.KERNALS.splice(i, 1);
      }

    }

  } //tick

};
