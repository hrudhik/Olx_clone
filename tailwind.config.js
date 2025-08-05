// const flowbit=require('flowbite-react/tailwind')
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,jsx,ts,tsx}",   
//     flowbit.content()
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     flowbit.plugin(),
//   ],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",   // ✅ include Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"),          // ✅ correct
  ],
}
