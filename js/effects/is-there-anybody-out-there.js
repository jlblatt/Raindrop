EFFECTS['is_there_anybody_out_there'] = {

  SETTINGS: {
    count: 600,
    speed: 0.0003,
    rotx: 1,
    roty: 1,
    rotz: 1
  },

  STARS: [],
  BOOST: 0,

  setup: function() {
    for(var i = 0; i < this.SETTINGS.count; i++) {
      var randcolor = THEME[Math.floor(Math.random() * THEME.length)];

      var material = new THREE.MeshBasicMaterial({color: randcolor});

      var geometry = new THREE.SphereGeometry(2, 12, 12);
      geometry.translate((Math.random() - 0.5) * 6000, (Math.random() - 0.5) * 6000, (Math.random() - 0.5) * 6000);

      var mesh = new THREE.Mesh(geometry, material);

      SCENE.add(mesh);
      this.STARS.push(mesh);
    }
  }, //load

  spawn: function(note) {
    this.BOOST += 0.001;
    this.LAST = Date.now();
  },

  despawn: function(note) {

  },

  click: function() {

  },

  input: function() {

  },

  tick: function() {
    for(var i = 0; i < this.STARS.length; i++) {
      this.STARS[i].rotation.x += this.SETTINGS.rotx * this.SETTINGS.speed + this.BOOST;
      this.STARS[i].rotation.y += this.SETTINGS.roty * this.SETTINGS.speed + this.BOOST;
      this.STARS[i].rotation.z += this.SETTINGS.rotz * this.SETTINGS.speed + this.BOOST;
    }
    if(this.BOOST > 0.0001) this.BOOST = this.BOOST * 0.95;
  },

  randomize: function() {
    for(var i = 0; i < this.STARS.length; i++) {
      this.STARS[i].material.color = new THREE.Color(THEME[Math.floor(Math.random() * THEME.length)]);
    }
  }

};
