EFFECTS['gforce'] = {

  SETTINGS: {
    complexity: 16,
    spawnAmount: 4,
    growAmt: .06
  },

  WAVEFORMS: [],

  setup: function() {

  },

  spawn: function(note) {

    for(var i = 0; i < this.SETTINGS.spawnAmount; i++) {
      var randcolor = THEME[Math.floor(Math.random() * THEME.length)];
      var x = -800;
      var dx = 1600 / this.SETTINGS.complexity;
      var lastVector = new THREE.Vector3(x, 0, 0);

      for(var j = 0; j < this.SETTINGS.complexity; j++) {
        
        var material = new THREE.LineBasicMaterial({color: randcolor, transparent: true, opacity: 1});
        material.blending = THREE.AdditiveBlending;

        var geometry = new THREE.Geometry();
        var newVector = new THREE.Vector3(x + dx, (Math.random() * 100) - 50, -50);

        geometry.vertices.push(lastVector);
        geometry.vertices.push(newVector);
        lastVector = newVector;

        var mesh = new THREE.Line(geometry, material);

        SCENE.add(mesh);
        this.WAVEFORMS.push(mesh);

        x += dx;
      }
    }

  }, //spawn

  despawn: function(note) {

  },

  click: function() {
   //this.spawn();
  },

  input: function() {

  },

  tick: function() {

    var i = this.WAVEFORMS.length;

    while(i--) {

      var w = this.WAVEFORMS[i];

      w.material.opacity -= MIDI.Player.BPM / 4000;
      w.scale.x += this.SETTINGS.growAmt;
      w.scale.y += this.SETTINGS.growAmt;

      if(w.material.opacity < 0) {
        SCENE.remove(w);
        this.WAVEFORMS.splice(i, 1);
      }

    }
  }, //tick

  randomize: function() {

  }

};
