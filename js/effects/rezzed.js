EFFECTS['rezzed'] = {

  SETTINGS: {
    drawDistance: 8
  },

  PLANES: [],
  COLORCOUNT: 0,

  setup: function() {

    for(var i = 0; i < this.SETTINGS.drawDistance; i++) {

      var nextcolor = THEME[this.COLORCOUNT];
      this.COLORCOUNT++;
      if(this.COLORCOUNT > THEME.length - 1) this.COLORCOUNT = 0;

      var material = new THREE.MeshBasicMaterial({color: nextcolor, wireframe: true});
      var geometry = new THREE.PlaneGeometry(10, 100);
      var mesh = new THREE.Mesh(geometry, material);

      mesh.rotation.x = 0;
      mesh.rotation.y = 0;

      SCENE.add(mesh);

      this.PLANES.push(mesh);

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

  },

  randomize: function() {

  }

};
