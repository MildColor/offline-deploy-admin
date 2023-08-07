import "styled-components";
import { ColorTypes, AnimationTypes } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors:  ColorTypes;
    animation:  AnimationTypes;
  }
}
