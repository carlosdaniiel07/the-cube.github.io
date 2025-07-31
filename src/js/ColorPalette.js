class ColorPalette {
  constructor(game) {
    this.game = game;
    this.selectedColor = null;
  }

  init() {
    this.dom = {
      container: document.querySelector('.ui__color-palette'),
      colors: document.querySelectorAll('.color-palette__color')
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
}

export { ColorPalette }; 