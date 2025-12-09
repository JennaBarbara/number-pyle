/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
    safelist: [
        {
            pattern: /text-(red|blue|stone)-(100|200|300|400|500)/,
            
        }, 'h-0', 'h-25', 'overflow-hidden', 
    ]
}