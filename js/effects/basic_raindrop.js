EFFECTS['basic_raindrop'] = {


  DROPS: [],


  spawn: function(note) {

    //var color = MIDI.Synesthesia.map('Alexander Scriabin (1911)')[note.note];
    //var material = new THREE.MeshBasicMaterial({color: color.hsl, transparent: true, opacity: 1});
    var material = new THREE.MeshBasicMaterial({color: 0xccccff, transparent: true, opacity: 1});
    var geometry = new THREE.RingGeometry(5, 5.25, 96, 1);
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = INPUT.x;
    mesh.position.y = INPUT.y;

    mesh.growAmt = .5;

    SCENE.add(mesh);
    this.vars.DROPS.push(mesh);

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
