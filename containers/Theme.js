import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../theme/theme';

export default function Theme({ children }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}