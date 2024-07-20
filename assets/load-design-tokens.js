fetch('{{ "design-tokens.tokens.json" | asset_url }}')
  .then(response => response.json())
  .then(tokens => {
    const root = document.documentElement;

    // Loop through the tokens and set them as CSS variables
    Object.keys(tokens.color).forEach(key => {
      root.style.setProperty(`--${key}`, tokens.color[key].value);
    });

    Object.keys(tokens.typography).forEach(key => {
      const typography = tokens.typography[key].value;
      Object.keys(typography).forEach(prop => {
        root.style.setProperty(`--${key}-${prop}`, typography[prop].value);
      });
    });
  });
