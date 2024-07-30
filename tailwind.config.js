tailwind.config = {
    theme:{
        extend:{
            gridTemplateColumns:{
                'auto': 'repeat(auto-fit, minmax(200px, 1fr))'
            },
            fontFamily:{
                outfit:["outfit", "sans-serif"],
                ovo:["outfit", "serif"],
            },
            animation:{
                spin_slow: 'spin 6s linear infinite'
            },
            colors:{
                lightHover: '#fcf4ff',
                darkHover:'#2a004a',
                darkTheme:'#11001F'
            },
            boxShadow:{
                'black': '4px_4px_0_#000',
                'white': '4px 4px 0 #fff',
            }

        }
        },

         darkMode: 'selector'

}