EFFECTS['mesh_pit'] = {

  SETTINGS: {
    complexity: 24,
    brightness: .25
  },

  PANELS: [],

  setup: function() {

    var xcount = Math.floor(this.SETTINGS.complexity * window.innerWidth / 1000);
    var ycount = Math.floor(this.SETTINGS.complexity * window.innerHeight / 1000);
    var basez = -Math.pow(this.SETTINGS.complexity, 2.4)

    for(var i = 0; i < xcount; i++) {

      this.PANELS.push([]);

      for(var j = 0; j < ycount; j++) {

        //http://www.color-hex.com/color-palette/8489
        var randcolors = [0x141427, 0x566e89, 0x6aa0c1, 0x8cb9d4, 0x22475e];
        var randcolor = randcolors[Math.floor(Math.random() * randcolors.length)];

        var baseopacity = this.SETTINGS.brightness + (Math.random() * .1);

        var material = new THREE.MeshBasicMaterial( {color: randcolor, transparent: true, opacity: baseopacity} );

        var sideWidth = this.SETTINGS.complexity * 12;

        var geometry = new THREE.PlaneGeometry(sideWidth, sideWidth);
        geometry.translate((i * (sideWidth * 1.03) - sideWidth * xcount / 2), (j * (sideWidth * 1.03) - sideWidth * ycount / 2), basez);

        var mesh = new THREE.Mesh(geometry, material);

        SCENE.add(mesh);

        mesh.basez = basez;
        mesh.baseopacity = baseopacity;
        this.PANELS[i].push(mesh);
      }

    }

  },

  spawn: function(note) {

    if(true || INPUT.e.keyCode) {
      
      for(var i = 0; i < this.SETTINGS.complexity; i++) {
        var x = Math.floor(Math.random() * this.PANELS.length);
        var y = Math.floor(Math.random() * this.PANELS[0].length);
        this.PANELS[x][y].material.opacity = this.PANELS[x][y].material.opacity  * 2;
        this.PANELS[x][y].position.z = this.PANELS[x][y].position.z * -.1;
      }

    } else {

    }

  },

  despawn: function(note) {

  },

  click: function() {

  },

  input: function() {

  },

  tick: function() {

    for(var i = 0; i < this.PANELS.length; i++) {

      for(var j = 0; j < this.PANELS[i].length; j++) {

        var p = this.PANELS[i][j];

        if(p.position.z > p.basez) {
          p.position.z -= MIDI.Player.BPM / 20000;
        }
        
        if(p.material.opacity > p.baseopacity) {
          p.material.opacity -= MIDI.Player.BPM / 20000;
        }
      }

    }

  },

  randomize: function() {

  }

};
