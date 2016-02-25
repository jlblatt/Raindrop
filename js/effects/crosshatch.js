EFFECTS['crosshatch'] = {

  SETTINGS: {
    opacity: 0.20,
    fadeSpeed: 1800,
    spread: 500
  },

  HATCHES: [],

  spawn: function(note) {
    //http://www.color-hex.com/color-palette/15138
    var randcolors = [0x08ddd7, 0x68cdff, 0xffffff, 0xffc68c, 0xff8746];

    var randcolor = randcolors[Math.floor(Math.random() * randcolors.length)];

    for(var i = 0; i < 20; i++) {

      var thickness = Math.floor(Math.random() * 70) + (i * 20);
      if(i > 12) thickness = Math.random() * 20 + 20;

      var opacity = this.SETTINGS.opacity + (1 / thickness);
      if(i > 14) opacity = opacity * 1.6;

      var material = new THREE.MeshBasicMaterial( {color: randcolor, side: THREE.DoubleSide, transparent: true, opacity: opacity} );
      material.blending = THREE.AdditiveBlending;

      var geometry = i % 2 ? new THREE.PlaneGeometry(4000, thickness) : new THREE.PlaneGeometry(thickness, 4000);

      var mesh = new THREE.Mesh(geometry, material);

      mesh.position.x = INPUT.x;
      mesh.position.y = INPUT.y;

      var randx = ( (Math.random() - 0.5) * ((i + 1) % 2) * this.SETTINGS.spread);
      var randy = ( (Math.random() - 0.5) * (i % 2) * this.SETTINGS.spread);

      if(i < 18) mesh.position.x = mesh.position.x + randx;
      if(i < 18) mesh.position.y = mesh.position.y + randy;

      SCENE.add(mesh);
      this.HATCHES.push(mesh);
    }
  },

  despawn: function(note) {

  },

  click: function() {

  },

  input: function() {

  },

  tick: function() {

    var i = this.HATCHES.length;

    while(i--) {

      var d = this.HATCHES[i];

      d.material.opacity -= d.material.opacity * Math.random() * (MIDI.Player.BPM / this.SETTINGS.fadeSpeed);

      if(d.material.opacity < 0.05) {
        SCENE.remove(d);
        this.HATCHES.splice(i, 1);
      }

    }

  },

  randomize: function() {
    this.SETTINGS.fadeSpeed = 800 + Math.floor(Math.random() * 2000);
    this.SETTINGS.opacity = (Math.random() * 0.20) + .1;
    this.SETTINGS.spread = (Math.random() * 600) + 400;
  }

};
