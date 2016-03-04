var SONGS = [
  {
    path: "midi/mellon-collie-and-the-infinite-sadness.mid",
    bpm: 86,
    wadsworth: 50,
    effectMapping: {
      globals: [],
      channels: {
        0: 'box_fireworks',
        1: 'is_there_anybody_out_there',
        2: 'is_there_anybody_out_there',
        3: 'is_there_anybody_out_there'
      }
    }
  },
  {
    path: "midi/flight-of-the-bumblebee.mid",
    bpm: 150,
    effectMapping: {
      globals: ['box_fireworks']
    }
  },
  {
    path: "midi/greensleeves.mid",
    bpm: 70,
    wadsworth: 15,
    effectMapping: {
      globals: ['gravity_petals'],
      channels: {
        0: 'is_there_anybody_out_there',
        1: 'crosshatch',
      }
    }
  },
  {
    path: "midi/angels-fear.mid",
    bpm: 60,
    effectMapping: {
      globals: ['gravity_petals'],
      channels: {
        0: 'basic_raindrop',
        1: 'is_there_anybody_out_there',
        2: 'box_fireworks'
      }
    }
  },
  {
    path: "midi/distant-thunder.mid",
    effectMapping: {
      globals: [],
      channels: {
        0: 'crosshatch',
        2: 'basic_raindrop'
      }
    }
  },
  {
    path: "midi/zelda.mid",
    effectMapping: {
      globals: ['gravity_petals'],
      channels: {
        1: 'crosshatch',
        0: 'basic_raindrop'
      }
    }
  },
  {
    path: "midi/mega-man-3.mid",
    effectMapping: {
      globals: ['gravity_petals', 'mesh_pit'],
      channels: {
        0: 'is_there_anybody_out_there',
      }
    }
  }
];
