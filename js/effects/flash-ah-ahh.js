EFFECTS['flash_ah_ahh'] = {

  FLASHES: [],
  FLASHCOUNTER: -1,

  setup: function() {

  },

  spawn: function(note) {
    if(true || this.FLASHCOUNTER < 0) {
      var randcolor = THEME[Math.floor(Math.random() * THEME.length)];

      var material = new THREE.MeshBasicMaterial({color: randcolor, transparent: true, opacity: 1});
      var geometry = new THREE.PlaneGeometry(2000, 1000);
      var mesh = new THREE.Mesh(geometry, material);

      SCENE.add(mesh);
      this.FLASHES.push(mesh);
      this.FLASHCOUNTER = 7;
    }
  },

  despawn: function(note) {

  },

  click: function() {
    this.FLASHCOUNTER--;
  }, //click

  input: function() {

  },

  tick: function() {

    var i = this.FLASHES.length;

    while(i--) {

      var f = this.FLASHES[i];

      f.material.opacity -= MIDI.Player.BPM / 1000;

      if(f.material.opacity < 0) {
        SCENE.remove(f);
        this.FLASHES.splice(i, 1);
      }

    }

  }, //tick

  randomize: function() {

  }

};
