/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'

const myTheme = {
  dark: 'true',
  colors: {
    primary: '#800080',
    secondary: '#f48fb1', // Pink
    background: '#121212', // Dark background
    surface: '#1e1e1e', // Surface elements like cards
    error: '#ef5350',
    success: '#66bb6a',
    warning: '#ffa726',
    info: '#29b6f6',
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'myTheme',
    themes: {
      myTheme,
    },
  },
})
