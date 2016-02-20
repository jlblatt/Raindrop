EFFECTS['radial_strobe'] = {

  SETTINGS: {
    innerRadius: 5,
    outerRadius: 6.5,
    segments: 96,
    growSpeed: 12,
    fadeSpeed: 1000
  },

  CLICKS: [],

  spawn: function(note) {

  },

  despawn: function(note) {

  },

  click: function() {

    var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 1});
    var geometry = new THREE.RingGeometry(this.SETTINGS.innerRadius, this.SETTINGS.outerRadius, this.SETTINGS.segments, 1);
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = INPUT.x;
    mesh.position.y = INPUT.y;

    mesh.growSpeed = this.SETTINGS.growSpeed;

    SCENE.add(mesh);
    this.CLICKS.push(mesh);

  }, //click

  input: function() {

  },

  tick: function() {
    var i = this.CLICKS.length;

    while(i--) {

      var d = this.CLICKS[i];

      d.material.opacity -= MIDI.Player.BPM / this.SETTINGS.fadeSpeed;
      d.scale.x += d.growSpeed;
      d.scale.y += d.growSpeed;

      if(d.material.opacity < 0) {
        SCENE.remove(d);
        this.CLICKS.splice(i, 1);
      }

    }

  }, //tick

  randomize: function() {
    this.SETTINGS.innerRadius = 2 + (0.5 * Math.floor(Math.random() * 8 / 0.5));
    this.SETTINGS.outerRadius = 3 + (0.5 * Math.floor(Math.random() * 9 / 0.5));
    this.SETTINGS.segments = Math.random() < 0.25 ? 96: Math.floor(Math.random() * 20);
    this.SETTINGS.growSpeed = 4 + Math.floor(Math.random() * 10);
    this.SETTINGS.fadeSpeed = 500 + Math.floor(Math.random() * 1000);

    if(this.SETTINGS.innerRadius > this.SETTINGS.outerRadius) {
      var tmp = this.SETTINGS.innerRadius;
      this.SETTINGS.innerRadius = this.SETTINGS.outerRadius;
      this.SETTINGS.outerRadius = tmp;
    }
    else if(this.SETTINGS.innerRadius == this.SETTINGS.outerRadius) {
      this.SETTINGS.outerRadius += 1;
    }
  } //randomize

};
