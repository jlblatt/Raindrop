EFFECTS['mesh_pit'] = {

  SETTINGS: {
    complexity: 24,
    brightness: .25
  },

  PANELS: [],

  setup: function() {

    var xcount = Math.floor(this.SETTINGS.complexity * window.innerWidth / 1000);
    var ycount = Math.floor(this.SETTINGS.complexity * window.innerHeight / 1000);

    for(var i = 0; i < xcount; i++) {

      this.PANELS.push([]);

      for(var j = 0; j < ycount; j++) {

        //http://www.color-hex.com/color-palette/8489
        var randcolors = [0x141427, 0x566e89, 0x6aa0c1, 0x8cb9d4, 0x22475e];
        var randcolor = randcolors[Math.floor(Math.random() * randcolors.length)];
        var baseopacity = this.SETTINGS.brightness + (Math.random() * .1);
        var sideWidth = this.SETTINGS.complexity * 12;

        var material = new THREE.MeshBasicMaterial( {color: randcolor, transparent: true, opacity: baseopacity} );
        var geometry = new THREE.PlaneGeometry(sideWidth, sideWidth);
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = (i * (sideWidth * 1.03) - sideWidth * xcount / 2);
        mesh.position.y = (j * (sideWidth * 1.03) - sideWidth * ycount / 2);
        mesh.position.z = -Math.pow(this.SETTINGS.complexity, 2.4);

        mesh.rotation.x = 0;
        mesh.rotation.y = 0;

        SCENE.add(mesh);

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
        this.PANELS[x][y].material.opacity = this.PANELS[x][y].material.opacity  * 3;
        this.PANELS[x][y].rotation.x += .2;
        this.PANELS[x][y].rotation.y += .2;
      }

    } else {

    }

  },

  despawn: function(note) {

  },

  click: function() {
    foo = true;
  },

  input: function() {

  },

  tick: function() {

    for(var i = 0; i < this.PANELS.length; i++) {

      for(var j = 0; j < this.PANELS[i].length; j++) {

        var p = this.PANELS[i][j];

        var speed = MIDI.Player.BPM / 10000;

        if(p.rotation.x < -0.01) {
          p.rotation.x  += speed;
        } else if(p.rotation.x > 0.01) {
          p.rotation.x -= speed;
        }

        if(p.rotation.y < -0.01) {
          p.rotation.y  += speed;
        } else if(p.rotation.y > 0.01) {
          p.rotation.y -= speed;
        }
        
        if(p.material.opacity > p.baseopacity) {
          p.material.opacity -= speed / 1.5;
        }
      }

    }

  },

  randomize: function() {

  }

};

var foo = true;