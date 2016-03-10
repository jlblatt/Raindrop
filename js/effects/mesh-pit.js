EFFECTS['mesh_pit'] = {

  SETTINGS: {
    complexity: 24,
    brightness: .3
  },

  PANELS: [],

  setup: function() {

    var xcount = Math.floor(this.SETTINGS.complexity * window.innerWidth / 1000);
    var ycount = Math.floor(this.SETTINGS.complexity * window.innerHeight / 1000);

    for(var i = 0; i < xcount; i++) {

      this.PANELS.push([]);

      for(var j = 0; j < ycount; j++) {
        var randcolor = THEME[Math.floor(Math.random() * THEME.length)];
        var baseopacity = this.SETTINGS.brightness + (Math.random() * .2);
        var sideWidth = this.SETTINGS.complexity * 12;

        //var material = new THREE.MeshBasicMaterial({color: randcolor, transparent: true, opacity: baseopacity});
        var material = new THREE.MeshLambertMaterial({color: randcolor, emissive: randcolor, transparent: true, opacity: baseopacity});
        var geometry = new THREE.PlaneGeometry(sideWidth, sideWidth);
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = (i * (sideWidth * 1.03) - sideWidth * xcount / 2);
        mesh.position.y = (j * (sideWidth * 1.03) - sideWidth * ycount / 2);
        mesh.position.z = -Math.pow(this.SETTINGS.complexity, 2.4);
        mesh.basez = mesh.position.z;

        mesh.rotation.x = 0;
        mesh.rotation.y = 0;

        SCENE.add(mesh);

        mesh.baseopacity = baseopacity;
        this.PANELS[i].push(mesh);
      }

      var light = new THREE.AmbientLight(0x000000);
      SCENE.add(light);

    }

  },

  spawn: function(note) {

    if(true || INPUT.e.keyCode) {
      
      for(var i = 0; i < this.SETTINGS.complexity * 1.5; i++) {
        var x = Math.floor(Math.random() * this.PANELS.length);
        var y = Math.floor(Math.random() * this.PANELS[0].length);
        this.PANELS[x][y].material.opacity = this.PANELS[x][y].material.opacity  * 3;
        this.PANELS[x][y].rotation.x += .3;
        this.PANELS[x][y].rotation.y += .3;
        this.PANELS[x][y].position.z += 200;
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

        var speed = MIDI.Player.BPM / 10000;

        if(p.rotation.x < -0.005) {
          p.rotation.x  += speed;
        } else if(p.rotation.x > 0.005) {
          p.rotation.x -= speed;
        } else {
          p.rotation.x = 0;
        }

        if(p.rotation.y < -0.005) {
          p.rotation.y  += speed;
        } else if(p.rotation.y > 0.005) {
          p.rotation.y -= speed;
        } else {
          p.rotation.y = 0;
        }

        if(p.position.z > p.basez) {
          p.position.z  -= speed * 220;
        } else {
          p.position.z ==  p.basez;
        }
        
        if(p.material.opacity > p.baseopacity) {
          p.material.opacity -= speed / 1.5;
        }
      }

    }

  },

  randomize: function() {

    for(var i = 0; i < this.PANELS.length; i++) {
      for(var j = 0; j < this.PANELS[i].length; j++) {
        var p = this.PANELS[i][j];
        var randcolor = THEME[Math.floor(Math.random() * THEME.length)];
        p.material.color = new THREE.Color(randcolor);
        p.material.emissive = new THREE.Color(randcolor);
      }
    }

  }

};