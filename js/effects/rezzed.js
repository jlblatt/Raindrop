EFFECTS['rezzed'] = {

  SETTINGS: {
    size: 180,
    drawDistance: 6
  },

  PLANES: [],
  COLORCOUNT: 0,
  DISTANCECOUNT: 0,



  newPanel: function(i) {

    var nextcolor = THEME[this.COLORCOUNT];
    this.COLORCOUNT++;
    if(this.COLORCOUNT > THEME.length - 1) this.COLORCOUNT = 0;
 
    var material = new THREE.MeshBasicMaterial({color: nextcolor, wireframe: true});
    //var material = new THREE.MeshBasicMaterial({color: nextcolor, side: THREE.DoubleSide});
    var geometry = new THREE.PlaneGeometry(this.SETTINGS.size * 2, this.SETTINGS.size, parseInt(this.SETTINGS.size / 14), parseInt(this.SETTINGS.size / 14) );
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = -48;
    mesh.position.z = (this.SETTINGS.size * (this.SETTINGS.drawDistance / 1.5)) + (-this.SETTINGS.size * i);

    mesh.rotation.x = Math.PI / 2;

    SCENE.add(mesh);

    this.PLANES.push(mesh);
  

  }, //this.newPanel

  setup: function() {

    //build ground

    for(var i = 0; i < this.SETTINGS.drawDistance; i++) {
      this.newPanel(i);
    }

    //set fog

    //SCENE.fog = new THREE.Fog(0xefd1b5, -2 * this.SETTINGS.size * this.SETTINGS.drawDistance, -2 * this.SETTINGS.size * this.SETTINGS.drawDistance);
    SCENE.fog = new THREE.Fog(0x000000, -this.SETTINGS.size / 3);

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

    //move ground forward

    var i = this.PLANES.length;

    while(i--) {

      var p = this.PLANES[i];

      p.position.z += MIDI.Player.BPM / 250;
      
      if(p.position.z > (this.SETTINGS.size * (this.SETTINGS.drawDistance / 1.5)) + this.SETTINGS.size) {
        SCENE.remove(p);
        this.PLANES.splice(i, 1);
        this.newPanel(this.SETTINGS.drawDistance - 1);
      }

    }

  }, //tick

  randomize: function() {

    //recolor ground

    for(var i = 0; i < this.PLANES.length; i++) {
      var p = this.PLANES[i];
      var nextcolor = THEME[this.COLORCOUNT];
      this.COLORCOUNT++;
      if(this.COLORCOUNT > THEME.length - 1) this.COLORCOUNT = 0;
      p.material.color = new THREE.Color(nextcolor); 
    }

  } //randomize

};
