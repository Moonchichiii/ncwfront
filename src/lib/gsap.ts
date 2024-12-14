import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { ExpoScaleEase, SlowMo } from 'gsap/EasePack';
import Flip from 'gsap/Flip';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Observer from 'gsap/Observer';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import Draggable from 'gsap/Draggable';
import TextPlugin from 'gsap/TextPlugin';

// Register all plugins
gsap.registerPlugin(
    CustomEase,
    ExpoScaleEase,
    SlowMo,
    Flip,
    ScrollTrigger,
    Observer,
    ScrollToPlugin,
    Draggable,
    TextPlugin
);

// Export everything
export {
    gsap,
    CustomEase,
    ExpoScaleEase,
    SlowMo,
    Flip,
    ScrollTrigger,
    Observer,
    ScrollToPlugin,
    Draggable,
    TextPlugin
};