const theme = {
  light: {
    name: 'Light Theme',
    color: {
      text: {
        primary: '#404040',
        secondary: '#575757',
        link: '#2F8DE3', // Opal 500
        visited: '#7B237B', // Amethyst 600
        disabled: '#A3A3A3',
        success: '#0A842F', // Green 800
        warning: '#FEBA00', //
        danger: '#CC1D33', // Red 700
        info: '#256EC2', // Opal 700
      },
      fill: {
        primary: '#174091', // Opal 900
        secondary: '#212223', // Obsidian 900
        disabled: '#C3C3C3',
        success: '#0A842F', // Green 800
        warning: '#FEBA00',
        danger: '#CC1D33', // Red 700
        info: '#256EC2', // Opal 700
      },
      background: {
        primary: '#FFFFFF', // White
        secondary: '#F7F7F7',
      },
      border: {
        primary: '#E3E3E3',
      },
    },
    textSize: {
      small: '0.8rem',
      medium: '1rem',
      large: '1.2rem',
    },
    avatarSize: {
      small: '30px',
      medium: '36px',
      large: '42px',
    },
    weight: {
      light: 300,
      normal: 400,
      bold: 600,
    },
    shadow:
      '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  },
  dark: {
    name: 'Dark Theme',
    color: {
      text: {
        primary: '#E8DEC8', // Antique Gold 300
        secondary: '#9E9FA1', // Obsidian 500
        link: '#0F90A8', // Emerald 700
        visited: '#6A126A', // Amethyst 500
        disabled: '#646464',
        success: '#56C26A', // Green 400
        warning: '#FFD54F', // Yellow 300
        danger: '#ED323B', // Red 500
        info: '#76D7EA',
      },
      fill: {
        primary: '#E8DEC8', // Antique Gold 300
        secondary: '#A59C87', // Antique Gold 500
        disabled: '#C3C3C3',
        success: '#56C26A', // Green 400
        warning: '#FFD54F', // Yellow 300
        danger: '#ED323B', // Red 500
        info: '#76D7EA',
      },
      background: {
        primary: '#212223', // Obsidian 900
        secondary: '#252627', // Pewter 800
      },
      border: {
        primary: '#333333',
      },
    },
    textSize: {
      small: '0.8rem',
      medium: '1rem',
      large: '1.2rem',
    },
    avatarSize: {
      small: '30px',
      medium: '36px',
      large: '42px',
    },
    weight: {
      light: 300,
      normal: 400,
      bold: 500,
    },
    shadow:
      '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  },
};

export default theme;
