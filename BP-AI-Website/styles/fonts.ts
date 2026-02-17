import {
  Inter,
  Julius_Sans_One,
  Outfit,
  Lekton,
  Poppins,
  Montserrat,
} from "next/font/google";
import localFont from "next/font/local";

const juliusSansOneFont = Julius_Sans_One({
  weight: "400",
  subsets: ["latin"],
});
export const jsoFont = juliusSansOneFont.className;
const interFontClass = Inter({ subsets: ["latin"] });
export const interFont = interFontClass.className;

const outfitFontClass = Outfit({ subsets: ["latin"] });
export const outfitFont = outfitFontClass.className;

const lektonFontClass = Lekton({ weight: ["400", "700"], subsets: ["latin"] });
export const lektonFont = lektonFontClass.className;

const poppinsFontClass = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export const poppinsFont = poppinsFontClass.className;

const montserratFontClass = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export const montserratFont = montserratFontClass.className;

const tanTangkiwood = localFont({
  src: '/fonts/TANTangkiwood-Display.ttf',
  display: 'swap',
});
export const tanTangkiwoodFont = tanTangkiwood.className;


const georgiaProCond = localFont({
  src: [
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-Black.ttf', weight: '900', style: 'normal' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-BlackItalic.ttf', weight: '900', style: 'italic' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-Bold.ttf', weight: '700', style: 'normal' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-BoldItalic.ttf', weight: '700', style: 'italic' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-CondBlack.ttf', weight: '900', style: 'normal' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-CondBlackItalic.ttf', weight: '900', style: 'italic' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-CondBold.ttf', weight: '700', style: 'normal' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-CondBoldItalic.ttf', weight: '700', style: 'italic' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-CondItalic.ttf', weight: '400', style: 'italic' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-CondLight.ttf', weight: '300', style: 'normal' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-CondLightItalic.ttf', weight: '300', style: 'italic' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-CondRegular.ttf', weight: '400', style: 'normal' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-CondSemiBold.ttf', weight: '600', style: 'normal' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-CondSemiBoldItalic.ttf', weight: '600', style: 'italic' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-Italic.ttf', weight: '400', style: 'italic' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-Light.ttf', weight: '300', style: 'normal' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-LightItalic.ttf', weight: '300', style: 'italic' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '/fonts/GeorgiaProCond/GeorgiaPro-SemiBoldItalic.ttf', weight: '600', style: 'italic' },
  ],
  display: 'swap',
})
export const georgiaProCondFont = georgiaProCond.className;