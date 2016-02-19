EFFECTS['basic_raindrop'] = {

  DROPS: [],

  spawn: function(note) {

    var material = new THREE.MeshBasicMaterial({color: 0xccccff, transparent: true, opacity: 1});
    var geometry = new THREE.RingGeometry(5, 5.15, 96, 1);
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = INPUT.x;
    mesh.position.y = INPUT.y;

    //mesh.growAmt = Math.random();
    mesh.growAmt = .4;

    SCENE.add(mesh);
    this.DROPS.push(mesh);

  }, //spawn

  despawn: function(note) {

  },

  click: function() {

  },

  input: function() {

  },

  tick: function() {

    var i = this.DROPS.length;

    while(i--) {

      var d = this.DROPS[i];

      d.material.opacity -= MIDI.Player.BPM / 10000;
      d.scale.x += d.growAmt;
      d.scale.y += d.growAmt;

      if(d.material.opacity < 0) {
        SCENE.remove(d);
        this.DROPS.splice(i, 1);
      }

    }

  } //tick

};
