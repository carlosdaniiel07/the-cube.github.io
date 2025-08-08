class ColorPalette {
  constructor(game) {
    this.game = game;
    this.selectedColor = null;
  }

  init() {
    this.dom = {
      container: document.querySelector('.ui__color-palette'),
      colors: document.querySelectorAll('.color-palette__color'),
      resetBtn: document.querySelector('.color-palette__reset-btn')
    };

    this.bindEvents();
    this.updateColors();
  }

  bindEvents() {
    this.dom.colors.forEach(colorBtn => {
      colorBtn.addEventListener('click', (e) => {
        const colorKey = e.target.dataset.color;
        this.selectColor(colorKey);
      });
    });

    if (this.dom.resetBtn) {
      this.dom.resetBtn.addEventListener('click', () => {
        this.resetAllColors();
      });
    }
  }

  selectColor(colorKey) {
    // Remove active class from all colors
    this.dom.colors.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected color
    const selectedBtn = document.querySelector(`[data-color="${colorKey}"]`);
    if (selectedBtn) {
      selectedBtn.classList.add('active');
    }
    
    this.selectedColor = colorKey;
    
    // Store the selected color for use in the game
    this.game.selectedColor = colorKey;
  }

  updateColors() {
    // Update the visual colors based on current theme
    const colors = this.game.themes.getColors();
    
    this.dom.colors.forEach(colorBtn => {
      const colorKey = colorBtn.dataset.color;
      const hexColor = colors[colorKey];
      
      if (hexColor) {
        // Convert hex to CSS color
        const cssColor = '#' + hexColor.toString(16).padStart(6, '0');
        colorBtn.style.background = cssColor;
      }
    });
  }

  getSelectedColor() {
    return this.selectedColor;
  }

  reset() {
    this.selectedColor = null;
    this.dom.colors.forEach(btn => btn.classList.remove('active'));
  }

  resetAllColors() {
    // Cor cinza original do cubo
    const grayColor = 0x808080;
    
    // Reseta todas as faces do cubo para cinza
    const faces = ['U', 'D', 'F', 'R', 'B', 'L'];
    faces.forEach(faceName => {
      // Atualiza a cor no tema
      this.game.themes.colors[this.game.themes.theme][faceName] = grayColor;
    });
    
    // Aplica a cor cinza a TODAS as edges (não apenas uma de cada face)
    this.game.cube.edges.forEach(edge => {
      if (faces.includes(edge.name)) {
        edge.material.color.setHex(grayColor);
      }
    });

    // Remove seleção ativa da paleta
    this.reset();
  }
}

export { ColorPalette }; 