import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import CustomEase from 'gsap/CustomEase';
import { ExpoScaleEase, SlowMo } from 'gsap/EasePack';
import Flip from 'gsap/Flip';
import Observer from 'gsap/Observer';
import Draggable from 'gsap/Draggable';
import TextPlugin from 'gsap/TextPlugin';

// Register plugins
gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  CustomEase,
  ExpoScaleEase,
  SlowMo,
  Flip,
  Observer,
  Draggable,
  TextPlugin
);

export {
  gsap,
  ScrollTrigger,
  ScrollToPlugin,
  CustomEase,
  ExpoScaleEase,
  SlowMo,
  Flip,
  Observer,
  Draggable,
  TextPlugin,
};