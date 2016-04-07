EFFECTS['rezzed_beta_1'] = {

  SETTINGS: {
    size: 100,
    drawDistance: 18,
    separation: 24
  },

  PLANES: [],
  COLORCOUNT: 0,
  DISTANCECOUNT: 0,

  newPanel: function(i) {

    var nextcolor = THEME[this.COLORCOUNT];
    this.COLORCOUNT++;
    if(this.COLORCOUNT > THEME.length - 1) this.COLORCOUNT = 0;

    for(var j = 0; j < 2; j++) {
      var material = new THREE.MeshBasicMaterial({color: nextcolor, wireframe: true});
      var geometry = new THREE.PlaneGeometry(this.SETTINGS.size * 2, this.SETTINGS.size, parseInt(this.SETTINGS.size / 6), parseInt(this.SETTINGS.size / 6) );
      var mesh = new THREE.Mesh(geometry, material);

      mesh.position.y = ((j % 2 ? 1 : -1) * this.SETTINGS.separation);
      mesh.position.z = (this.SETTINGS.size * (this.SETTINGS.drawDistance / 1.5)) + (-this.SETTINGS.size * i);

      mesh.rotation.x = Math.PI / 2;
      mesh.rotation.y = 0;

      SCENE.add(mesh);

      mesh.vy = 0;
      mesh.ay = (j % 2 == 0 ? 1 : -1) / 10;

      this.PLANES.push(mesh);
    }

  }, //this.newPanel

  setup: function() {

    for(var i = 0; i < this.SETTINGS.drawDistance; i++) {
      this.newPanel(i);
    }

  }, //setup

  spawn: function(note) {

    for(var i = 0; i < this.PLANES.length; i++) {
      var p = this.PLANES[i];
      //if(p.vy < -p.ay * 10 || p.vy > p.ay * 10) {
      if(Math.abs(p.position.y) < this.SETTINGS.separation * 3) {
        p.vy = -p.ay * 10;
        p.position.y += -p.ay * 10;
      }
    }

  }, //spawn

  despawn: function(note) {

  },

  click: function() {

  },

  input: function() {

  },

  tick: function() {

    var i = this.PLANES.length;

    while(i--) {

      var p = this.PLANES[i];

      p.position.z += MIDI.Player.BPM / 250;

      p.vy += p.ay;

      if(p.ay > 0 && p.vy < 0 || p.ay < 0 && p.vy > 0) {

      }

      if(Math.abs(p.position.y) > this.SETTINGS.separation) {
        p.position.y += p.vy;
      } 
      
      if(p.position.z > (this.SETTINGS.size * (this.SETTINGS.drawDistance / 1.5)) + this.SETTINGS.size) {
        SCENE.remove(p);
        this.PLANES.splice(i, 1);
        this.newPanel(this.SETTINGS.drawDistance - 1);
      }

    }

  }, //tick

  randomize: function() {

    for(var i = 0; i < this.PLANES.length; i++) {
      var p = this.PLANES[i];
      var nextcolor = THEME[this.COLORCOUNT];
      this.COLORCOUNT++;
      if(this.COLORCOUNT > THEME.length - 1) this.COLORCOUNT = 0;
      p.material.color = new THREE.Color(nextcolor); 
    }

  } //randomize

};
