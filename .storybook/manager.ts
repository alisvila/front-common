import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  
  // Brand
  brandTitle: 'Your Component Library',
  brandUrl: 'https://your-website.com',
  brandImage: '/your-logo.png', // Add your logo here
  brandTarget: '_self',

  // UI
  appBg: '#F9FAFB',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E5E7EB',
  appBorderRadius: 8,

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace',

  // Colors
  colorPrimary: '#3B82F6',
  colorSecondary: '#2563EB',

  // Toolbar default and active colors
  barTextColor: '#6B7280',
  barSelectedColor: '#3B82F6',
  barBg: '#FFFFFF',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#E5E7EB',
  inputTextColor: '#111827',
  inputBorderRadius: 4,
});

addons.setConfig({
  theme,
  showNav: true,
  showPanel: true,
  panelPosition: 'bottom',
  enableShortcuts: true,
  showToolbar: true,
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});