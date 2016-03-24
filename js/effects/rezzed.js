EFFECTS['rezzed'] = {

  SETTINGS: {
    size: 100,
    drawDistance: 8
  },

  PLANES: [],
  COLORCOUNT: 0,
  DISTANCECOUNT: 0,

  newPanel: function(dist) {

    var nextcolor = THEME[this.COLORCOUNT];
    this.COLORCOUNT++;
    if(this.COLORCOUNT > THEME.length - 1) this.COLORCOUNT = 0;

    var material = new THREE.MeshBasicMaterial({color: nextcolor, wireframe: true});
    var geometry = new THREE.PlaneGeometry(this.SETTINGS.size, this.SETTINGS.size, parseInt(this.SETTINGS.size / 6), parseInt(this.SETTINGS.size / 6) );
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = -this.SETTINGS.size / 10;
    mesh.position.z = (this.SETTINGS.size * (this.SETTINGS.drawDistance / 1.5)) + (-this.SETTINGS.size * dist);

    //mesh.translate(0,0,this.SETTINGS.size);
    //mesh.translateOnAxis('z', 0);

    mesh.rotation.x = Math.PI / 2;
    mesh.rotation.y = 0;

    SCENE.add(mesh);

    this.PLANES.push(mesh);

  }, //this.newPanel

  setup: function() {

    for(var i = 0; i < this.SETTINGS.drawDistance; i++) {
      this.newPanel(i);
    }

  }, //setup

  spawn: function(note) {

  },

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

      p.position.z += MIDI.Player.BPM / 100;

      if(p.position.z > (this.SETTINGS.size * (this.SETTINGS.drawDistance / 1.5)) + this.SETTINGS.size) {
        SCENE.remove(p);
        this.PLANES.splice(i, 1);
        this.newPanel(this.SETTINGS.drawDistance - 1);
      }

    }

  }, //tick

  randomize: function() {

  }

};
