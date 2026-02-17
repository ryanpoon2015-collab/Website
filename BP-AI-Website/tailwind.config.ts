import { CSSProperties } from "react";
import plugin, { Config } from "tailwindcss";
import { CSSRuleObject, PluginAPI } from "tailwindcss/types/config";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./preval/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "2xs": ".625rem",
        "3xs": ".5rem",
      },

      maxHeight: {
        "84": "21rem",
        "88": "22rem",
        "92": "23rem",
        "96": "24rem",
        "100": "25rem",
      },


      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // template - change only the colors / recomplie to see changes
        //? Loading Icon
        loading_icon: "#b9b9b9",

        //? Link
        link: "#92b8ff",

        //? Input
        input_border: "#b9b9b9",
        input_Text: "#000000",
        input_bg: "transparent",

        //? Button
        button: "#28859E",
        button_red: "#F04C2A",
        button_text: "#FFFFFF",

        //? Modal
        header_modal: "#28859E",
        modal_bg: '#FFFFFF',
        modal_t: '#2B2D2E',

        //? Logs Table
        log_gray: "#2B2D2E",

        //? Social Media
        social_media_bg: '#2B2D2E',
        social_media_bg_lighter: '#3C3D3E',
        social_media_icon: '#777777',


        // custom - from Figma
        text: '#D4D4D2',
        footer: '#2B2D2E',
        white: '#FFFFFF',
        bg: '#1B1A1D',
        blue: '#3578D9',
        gray: '#2B2D2E',
        bg_icon: '#E7E8E7',
        black: '#000000',
        red: '#E86666',
        green: '#83BF4F',
        yellow: '#D9C935',

      },
    },
  },
  plugins: [
    function ({ addUtilities, matchUtilities, theme }: PluginAPI) {
      const newUtilities: Record<string, CSSProperties> = {};
      generateFlex(newUtilities)
      generateWidthHeight(newUtilities)
      generateText(newUtilities, theme, matchUtilities)
      generateExtras(newUtilities, theme, matchUtilities)

      addUtilities(newUtilities as CSSRuleObject);
    }
  ],
} satisfies Config;


function generateExtras(newUtilities: Record<string, CSSProperties>,
  theme: PluginAPI["theme"],
  matchUtilities: PluginAPI["matchUtilities"]) {
  //! CURSOR POINTER
  newUtilities['.cp'] = {
    cursor: 'pointer',
    userSelect: 'none',
  };

  //! SELECT NONE
  newUtilities['.sn'] = {
    userSelect: 'none',
  };

  //! OPACITY
  matchUtilities(
    {
      'o': (value) => ({
        opacity: value,
      }),
    },
    { values: theme('opacity'), type: 'any' }
  );

  //! BORDER WIDTH
  matchUtilities(
    {
      'b': (value) => ({
        borderWidth: value,
      }),
      'b-t': (value) => ({
        borderTopWidth: value,
      }),
      'b-r': (value) => ({
        borderRightWidth: value,
      }),
      'b-b': (value) => ({
        borderBottomWidth: value,
      }),
      'b-l': (value) => ({
        borderLeftWidth: value,
      }),
      'b-x': (value) => ({
        borderLeftWidth: value,
        borderRightWidth: value,
      }),
      'b-y': (value) => ({
        borderTopWidth: value,
        borderBottomWidth: value,
      }),
    },
    { values: theme('borderWidth'), type: 'any' }
  );

  //! BORDER COLOR
  matchUtilities(
    {
      'b': (value) => ({
        borderColor: value,
      }),
      'b-t': (value) => ({
        borderTopColor: value,
      }),
      'b-r': (value) => ({
        borderRightColor: value,
      }),
      'b-b': (value) => ({
        borderBottomColor: value,
      }),
      'b-l': (value) => ({
        borderLeftColor: value,
      }),
      'b-x': (value) => ({
        borderLeftColor: value,
        borderRightColor: value,
      }),
      'b-y': (value) => ({
        borderTopColor: value,
        borderBottomColor: value,
      }),
    },
    { values: flattenColorPalette(theme('colors')), type: 'color' }
  );

  //! BORDER OPACITY
  matchUtilities(
    {
      'bo': (value) => ({
        borderOpacity: value,
      }),
    },
    { values: theme('opacity'), type: 'any' }
  );

  //! BORDER STYLE
  matchUtilities(
    {
      'b': (value) => ({
        borderStyle: value,
      }),
    },
    {
      values: {
        solid: 'solid',
        dashed: 'dashed',
        dotted: 'dotted',
        double: 'double',
        none: 'none',
      },
      type: 'any'
    }
  );

}

//! TEXT
function generateText(
  newUtilities: Record<string, CSSProperties>,
  theme: PluginAPI["theme"], matchUtilities: PluginAPI["matchUtilities"]) {

  const textAligns: [string, CSSProperties["textAlign"]][] = [['', undefined], ['l', 'left'], ['c', 'center'], ['r', 'right'], ['j', 'justify']];

  function fontSizeCompute(i: number) {
    if (i === 7) return '1.5rem';
    if (i === 8) return '1.875rem';
    if (i === 9) return '2.25rem';
    return `${0.500 + i * (0.125)}rem`;
  }

  matchUtilities(
    {
      't': (value) => ({
        color: value,
      }),
    },
    { values: flattenColorPalette(theme('colors')), type: 'color' }
  );


  //? Text Align + Font Size + Font Weight
  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      for (const ta of textAligns) {
        newUtilities[`.t${i}${j}${ta[0]}`] = {
          fontSize: fontSizeCompute(i),
          fontWeight: `${j}00`,
          textAlign: ta[1],
        };
      }
    }
  }

  //? Text Align Only
  for (const ta of textAligns) {
    newUtilities[`.t${ta[0]}`] = {
      textAlign: ta[1],
    };
  }

  //? Text Size Only
  for (let i = 1; i <= 9; i++) {
    newUtilities[`.t${i}`] = {
      fontSize: fontSizeCompute(i),
    };
  }

  //? Font Weight Only
  for (let j = 1; j <= 9; j++) {
    newUtilities[`.tf${j}`] = {
      fontWeight: `${j}00`,
    };
  }


  // Object.entries(theme('textColor') || {}).forEach(([key, value]) => {
  //   newUtilities[`.t-${key}`] = Array.isArray(value) ? { color: value[0], ...value[1] } : { color: value };
  // });

  // Object.entries(theme('fontSize') || {}).forEach(([key, value]) => {
  //   newUtilities[`.t${key}`] = Array.isArray(value) ? { fontSize: value[0], ...value[1] } : { fontSize: value };
  // });

  // Object.entries(theme('textAlign') || {}).forEach(([key, value]) => {
  //   newUtilities[`.t-${key}`] = Array.isArray(value) ? { textAlign: value[0], ...value[1] } : { textAlign: value };
  // });
}

//! WIDTH / HEIGHT
function generateWidthHeight(newUtilities: Record<string, CSSProperties>) {
  newUtilities['.wf'] = {
    width: '100%',
  };

  newUtilities['.hf'] = {
    height: '100%',
  };

  newUtilities['.ws'] = {
    width: '100vw',
  };

  newUtilities['.hs'] = {
    height: '100vh',
  };

  newUtilities['.min-wf'] = {
    minWidth: '100%',
  };

  newUtilities['.min-hf'] = {
    minHeight: '100%',
  };

  newUtilities['.min-ws'] = {
    minWidth: '100vw',
  };

  newUtilities['.min-hs'] = {
    minHeight: '100vh',
  };


}


//! FLEX
function generateFlex(newUtilities: Record<string, CSSProperties>) {
  const flexDirections: [string, ('row' | 'column' | 'wrap')][] = [['r', 'row'], ['c', 'column'], ['w', 'wrap']]
  const alignItems = [['s', 'flex-start'], ['c', 'center'], ['e', 'flex-end']]
  const justifyContent = [['s', 'flex-start'], ['c', 'center'], ['e', 'flex-end'], ['b', 'space-between'], ['a', 'space-around']]

  for (const flexDirection of flexDirections) {
    for (const align of alignItems) {
      for (const justify of justifyContent) {
        const key_name = `.${flexDirection[0]}${justify[0]}${align[0]}`;
        newUtilities[key_name] = {
          display: 'flex',
          justifyContent: justify[1],
          alignItems: align[1],
        };

        if (flexDirection[1] === 'wrap') newUtilities[key_name]['flexWrap'] = 'wrap';
        else newUtilities[key_name]['flexDirection'] = flexDirection[1];

        const gaps = [
          ...Array.from({ length: 20 }, (_, i) => i + 1),
          ...Array.from({ length: Math.floor((96 - 20) / 4) + 1 }, (_, i) => 20 + i * 4)
        ];

        for (const i of gaps) {
          newUtilities[`${key_name}-${i}`] = {
            ...newUtilities[key_name],
            gap: `${i * 0.25}rem`,
          };

          newUtilities[`${key_name}-${i}`] = {
            ...newUtilities[key_name],
            gap: `${i * 0.25}rem`,
          };
        }
      }
    }
  }
  // newUtilities['.fc'] = {
  //   display: 'flex',
  //   flexDirection: 'column',
  // };

  // newUtilities['.fr'] = {
  //   display: 'flex',
  //   flexDirection: 'row',
  // };

  // newUtilities['.is'] = {
  //   alignSelf: 'flex-start',
  // };

  // newUtilities['.ic'] = {
  //   alignItems: 'center',
  // };

  // newUtilities['.ie'] = {
  //   alignItems: 'flex-end',
  // };

  // newUtilities['.js'] = {
  //   justifyContent: 'flex-start',
  // };

  // newUtilities['.jc'] = {
  //   justifyContent: 'center',
  // };

  // newUtilities['.je'] = {
  //   justifyContent: 'flex-end',
  // };

  // newUtilities['.jb'] = {
  //   justifyContent: 'space-between',
  // };

  // newUtilities['.ja'] = {
  //   justifyContent: 'space-around',
  // };



  // Dynamically generate classes .fc1, .fc2, ..., .fc96
  // for (let i = 1; i <= 96; i++) {
  //   newUtilities[`.fc${i}`] = {
  //     display: 'flex',
  //     flexDirection: 'column',
  //     gap: `${i * 0.25}rem`,
  //   };

  //   newUtilities[`.fr${i}`] = {
  //     display: 'flex',
  //     flexDirection: 'row',
  //     gap: `${i * 0.25}rem`,
  //   };
  // }
}