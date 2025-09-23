/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // اللي بحطه هنا ببدل اللي موجود هناك واحطه بالقيمه دي وعشان هما ملهمش فونت فاملي فطبقه عادي
  theme: {
    fontFamily: {
      // انا هنا غيرت في الكونفجريشن بتاعت الخط سانس
      sans: 'Roboto Mono,monospace',
    },
    // هنا بحط الحاجات البديله لو في خاصيه مش موجوده
    extend: {
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
