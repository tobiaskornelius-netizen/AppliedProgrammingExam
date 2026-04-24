/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        bcg: {
          dark:    '#005C40',
          green:   '#00A859',
          hover:   '#004D35',
          muted:   '#007A50',
          light:   '#E6F4EE',
          lighter: '#F0FAF5',
        }
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.04)',
        'card-md': '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04)',
      }
    }
  },
  safelist: [
    // Dynamic risk badge classes returned from TypeScript methods
    'bg-red-100', 'text-red-800',
    'bg-yellow-100', 'text-yellow-800',
    'bg-blue-100', 'text-blue-800',
    'bg-green-100', 'text-green-800',
    'bg-gray-100', 'text-gray-600',
    'bg-purple-100', 'text-purple-800',
    // Risk score header classes
    'bg-green-500', 'bg-yellow-500', 'bg-red-600',
  ],
  plugins: [
    require('flowbite/plugin')
  ]
}
