EFFECTS['test'] = {

  spawn: function(note) {
    //fake cursor position in 3d scene here to save cycles as accuracy isn't important

    var x = ((INPUT.e.clientX / window.innerWidth) - .5) * window.innerWidth;
    var y = ((INPUT.e.clientY / window.innerHeight) - .5) * -window.innerHeight;

    if(note.channel == 0) {
      var size = (note.velocity + note.note) * Math.random() * 2;
      var b = Math.floor(192 + (Math.random() * 64));
      var r = b - 64;
      var g = b - 64;
      var opacity = .70 + (Math.random() * .2);

      var material = new THREE.MeshBasicMaterial({color: "rgb(" + r + ", " + g + ", " + b + ")", transparent: true, opacity: opacity});
      var geometry = new THREE.CircleGeometry(size, 72);
      geometry.translate(x, y, 0);
      var mesh = new THREE.Mesh(geometry, material);

      SCENE.add(mesh);

      function drop(mesh) {
        mesh.material.opacity -= .0125;
        if(mesh.material.opacity < 0) {
          SCENE.remove(mesh);
        } else {
          setTimeout(function(){
            drop(mesh);
          }, 16);
        }
      }

      drop(mesh);
    }

    else if(note.channel == 1) {
      var size = (note.velocity + note.note) * Math.random() * 4;
      var r = Math.floor(128 + (Math.random() * 128));
      var g = r - 64;
      var b = r - 64;
      var opacity = .40 + (Math.random() * .2);

      var material = new THREE.MeshBasicMaterial({color: "rgb(" + r + ", " + g + ", " + b + ")", transparent: true, opacity: opacity, wireframe: true});
      var geometry = new THREE.CircleGeometry(size, 24);
      var mesh = new THREE.Mesh(geometry, material);

      SCENE.add(mesh);

      function drop(mesh) {
        mesh.material.opacity -= .003;
        mesh.rotation.z -= .03;
        if(mesh.material.opacity < 0) {
          SCENE.remove(mesh);
        } else {
          setTimeout(function(){
            drop(mesh);
          }, 16);
        }
      }

      drop(mesh);
    }

    else if(note.channel == 2){
      var size = (note.velocity + note.note) * Math.random() * 3;
      var g = Math.floor(128 + (Math.random() * 128));
      var r = g - 64;
      var b = g - 64;
      var opacity = .40 + (Math.random() * .2);

      var material = new THREE.MeshBasicMaterial({color: "rgb(" + r + ", " + g + ", " + b + ")", transparent: true, opacity: opacity, wireframe: true});
      var geometry = new THREE.CircleGeometry(size, 36);
      geometry.translate(x, y, 0);
      var mesh = new THREE.Mesh(geometry, material);

      SCENE.add(mesh);

      function drop(mesh) {
        mesh.material.opacity -= .003;
        mesh.rotation.z += .03;
        if(mesh.material.opacity < 0) {
          SCENE.remove(mesh);
        } else {
          setTimeout(function(){
            drop(mesh);
          }, 16);
        }
      }

      drop(mesh);
    }

    else {
      var size = (note.velocity + note.note) * Math.random();
      var g = Math.floor(128 + (Math.random() * 128));
      var r = g;
      var b = g - 64;
      var opacity = .80 + (Math.random() * .2);

      var material = new THREE.MeshBasicMaterial({color: "rgb(" + r + ", " + g + ", " + b + ")", transparent: true, opacity: opacity});
      var geometry = new THREE.CircleGeometry(size, 36);
      geometry.translate(x, y, 0);
      var mesh = new THREE.Mesh(geometry, material);

      SCENE.add(mesh);

      function drop(mesh) {
        mesh.material.opacity -= .002;
        mesh.scale.x += .01;
        mesh.scale.y += .01;
        if(mesh.material.opacity < 0) {
          SCENE.remove(mesh);
        } else {
          setTimeout(function(){
            drop(mesh);
          }, 16);
        }
      }

      drop(mesh);
    }
  },

  despawn: function(note) {

  },

  click: function() {

  },

  input: function(e) {

  },

  tick: function() {

  }

};
