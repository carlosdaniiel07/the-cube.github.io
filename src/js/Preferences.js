import { Range } from "./Range.js";

class Preferences {
  constructor(game) {
    this.game = game;
  }

  init() {
    const getProgressInRange = (value, start, end) => {
      return Math.min(Math.max((value - start) / (end - start), 0), 1);
    };

    this.ranges = {
      size: new Range("size", {
        value: this.game.cube.size,
        range: [2, 5],
        step: 1,
        onUpdate: (value) => {
          this.game.cube.size = value;
        },
        onComplete: () => this.game.storage.savePreferences(),
      }),

      hue: new Range("hue", {
        value: 0,
        range: [0, 360],
        onUpdate: (value) => this.game.themeEditor.updateHSL(),
        onComplete: () => this.game.storage.savePreferences(),
      }),

      saturation: new Range("saturation", {
        value: 100,
        range: [0, 100],
        onUpdate: (value) => this.game.themeEditor.updateHSL(),
        onComplete: () => this.game.storage.savePreferences(),
      }),

      lightness: new Range("lightness", {
        value: 50,
        range: [0, 100],
        onUpdate: (value) => this.game.themeEditor.updateHSL(),
        onComplete: () => this.game.storage.savePreferences(),
      }),
    };

  }
}

export { Preferences };
