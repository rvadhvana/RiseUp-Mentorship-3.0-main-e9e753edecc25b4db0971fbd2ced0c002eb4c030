import { css } from '@emotion/react';
import { colors, typography } from './theme';

export const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${typography.fontFamily.sans};
    color: ${colors.gray[700]};
    background: ${colors.gray[50]};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${typography.fontFamily.heading};
    color: ${colors.gray[900]};
  }

  a {
    color: ${colors.primary[600]};
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      color: ${colors.primary[700]};
    }
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
  }
`; 