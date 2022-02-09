module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
      opacity: {
          '0%': {
              opacity:'0.2'
          },
          ' 100%': {
            opacity:'1'

          },
      },
      scale:{
        '0%':{
          transform:'scale(1.2)' ,
           opacity: '0',
        },
        '100%':{
          transform: 'scale(1)',
          opacity: '1'

        }
      },
      scale2:{
        '0%':{
          transform:'scale(1)' ,
        
        },
        '100%':{
          transform: 'scale(1.1)',
        }
      },
      
  },
  animation: {
    opacity: 'opacity 2.5s ease-in',
    scale: 'scale 100ms ',
    scale2: 'scale 100ms ease-in ',

    
  }
     
    },
    colors:{
      'blackColor':'#262626',
       'whiteColor':'#ffffff',
       'blueColor':'#5bbaf8',
        'greyColor':'#b8b8b8',
        'pinkColor':'#dd4187',
        'blueColorLogin':'#385185',
        'greyLightColor':'#efefef',
        'borderColor':'#dddddd',
        'bg-lightWhite':'#fafafa',
        'overlayColor':'rgba(37,37,37,1)'
    },
  },
  plugins: [],
}
