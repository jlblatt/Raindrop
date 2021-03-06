EFFECTS['rezzed'] = {

  SETTINGS: {
    size: 360,
    drawDistance: 6,
    height: 96,
    maxBots: 999,
    speed: 1 / 150
  },

  PLANES: [],
  COLORCOUNT: 0,
  DISTANCECOUNT: 0,

  BOTS: [],
  STAGES: [
    {
      //stage 1
      targetMatrix: [
        {x: -400, y: 150},
        {x: 400, y: 150},
        {x: -100, y: 200},
        {x: 100, y: 200},
        {x: -300, y: 100},
        {x: 300, y: 100},
        {x: -200, y: 150},
        {x: 200, y: 150},
        {x: -400, y: 50},
        {x: 400, y: 50},
        {x: -100, y: 100},
        {x: 100, y: 100},
        {x: -300, y: 0},
        {x: 300, y: 0},
        {x: -200, y: 50},
        {x: 200, y: 50}
      ],
      currTarget: 0
    },

    {
      //stage two
    },

    {
      //stage three
    }
  ],

  newPanel: function(i) {

    var nextcolor = THEME[this.COLORCOUNT];
    this.COLORCOUNT++;
    if(this.COLORCOUNT > THEME.length - 1) this.COLORCOUNT = 0;
 
    var material = new THREE.MeshBasicMaterial({color: nextcolor, wireframe: true});
    var geometry = new THREE.PlaneGeometry(this.SETTINGS.size * 2, this.SETTINGS.size, parseInt(this.SETTINGS.size / 32), parseInt(this.SETTINGS.size / 32) );
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = -this.SETTINGS.height;
    mesh.position.z = (this.SETTINGS.size * (this.SETTINGS.drawDistance / 1.5)) + (-this.SETTINGS.size * i);

    mesh.rotation.x = -Math.PI / 2;

    SCENE.add(mesh);

    this.PLANES.push(mesh);
  

  }, //this.newPanel

  setup: function() {

    //build ground

    for(var i = 0; i < this.SETTINGS.drawDistance; i++) {
      this.newPanel(i);
    }

    //set fog

    SCENE.fog = new THREE.Fog(0x000000, this.SETTINGS.size);

  }, //setup

  spawn: function(note) {

    if(this.BOTS.length == this.SETTINGS.maxBots) return;

    var randcolor = THEME[Math.floor(Math.random() * THEME.length)];

    var material = new THREE.MeshBasicMaterial({color: randcolor, transparent: true, opacity: 1});

    var geometry = new THREE.BoxGeometry(70, 70, 7)

    var mesh = new THREE.Mesh(geometry, material);

    var x = INPUT.x;
    if(x > this.SETTINGS.size) x = this.SETTINGS.size;
    else if(x < -this.SETTINGS.size) x = -this.SETTINGS.size;

    mesh.position.x = x;
    mesh.position.y = -this.SETTINGS.height;
    //mesh.position.z = Math.floor(Math.random() * this.SETTINGS.size / 2);
    mesh.position.z = this.PLANES[this.SETTINGS.drawDistance - 2].position.z - this.SETTINGS.size / 2;

    mesh.rotation.x = -2 * Math.PI / 2;

    mesh.from = { 
      x: mesh.position.x, 
      y: mesh.position.y, 
      rotx: mesh.rotation.x
    };

    mesh.tween = new TWEEN.Tween(mesh.from)
        .to({ 
          x: this.STAGES[0].targetMatrix[this.STAGES[0].currTarget].x, 
          y: this.STAGES[0].targetMatrix[this.STAGES[0].currTarget].y, 
          rotx: 0
        }, 1400)
        .onUpdate(function() {
          mesh.position.x = mesh.from.x;
          mesh.position.y = mesh.from.y;
          mesh.rotation.x = mesh.from.rotx;
        })
        .onComplete(function() {

        })
    .start();

    this.STAGES[0].currTarget++;
    if(this.STAGES[0].currTarget > this.STAGES[0].targetMatrix.length - 1) this.STAGES[0].currTarget = 0;

    SCENE.add(mesh);

    mesh.stage = 0;

    this.BOTS.push(mesh);

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

      p.position.z += MIDI.Player.BPM * this.SETTINGS.speed;
      
      if(p.position.z > (this.SETTINGS.size * (this.SETTINGS.drawDistance / 1.5)) + this.SETTINGS.size) {
        SCENE.remove(p);
        this.PLANES.splice(i, 1);
        this.newPanel(this.SETTINGS.drawDistance - 1);
      }

    }

    //move bots

    i = this.BOTS.length;

    while(i--) {

      var b = this.BOTS[i];

      b.position.z += MIDI.Player.BPM * this.SETTINGS.speed;

      switch(b.stage) {

        case 0:
          //stage one
        break;

        case 1:
          //stage two
        break;

        case 2:
          //stage three
        break;

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

    //recolor bots

    for(var i = 0; i < this.BOTS.length; i++) {
      var b= this.BOTS[i];
      var nextcolor = THEME[this.COLORCOUNT];
      this.COLORCOUNT++;
      if(this.COLORCOUNT > THEME.length - 1) this.COLORCOUNT = 0;
      b.material.color = new THREE.Color(nextcolor); 
    }


  } //randomize

};
