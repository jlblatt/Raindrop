EFFECTS['radial_strobe'] = {

  SETTINGS: {

  },

  CLICKS: [],
  SKIP: false,

  spawn: function(note) {

  },

  despawn: function(note) {

  },

  click: function() {

    //if(this.SKIP = !this.SKIP) return;

    var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 1});
    var geometry = new THREE.RingGeometry(6, 8, 96, 1);
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = INPUT.x;
    mesh.position.y = INPUT.y;

    mesh.growAmt = 6;

    SCENE.add(mesh);
    this.CLICKS.push(mesh);
  }, //click

  input: function() {

  },

  tick: function() {
    var i = this.CLICKS.length;

    while(i--) {

      var d = this.CLICKS[i];

      d.material.opacity -= MIDI.Player.BPM / 2000;
      d.scale.x += d.growAmt;
      d.scale.y += d.growAmt;

      if(d.material.opacity < 0) {
        SCENE.remove(d);
        this.CLICKS.splice(i, 1);
      }

    }

  } //tick

  randomize: function() {

  }

};
