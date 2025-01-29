import { Inria_Serif, Rubik } from "next/font/google";
import { Inter } from "next/font/google";

const inria_serif_bold_italic = Rubik({
  weight: "700",
  style: "italic",
  subsets: ["latin"],
});

const inria_serif_light = Rubik({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const inria_serif_regular = Rubik({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
});

const inria_serif_medium = Rubik({
  weight: "600",
  style: "normal",
  subsets: ["latin"],
});

const inria_serif_light_italic = Rubik({
  weight: "300",
  style: "italic",
  subsets: ["latin"],
});

const inria_serif_regular_italic = Rubik({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
});

const inria_serif_bold = Rubik({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
});

const inria_serif_extra_bold = Rubik({
  weight: "800",
  style: "normal",
  subsets: ["latin"],
});

const inter_bold = Inter({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
});

const inter_extra_bold = Rubik({
  weight: "900",
  style: "normal",
  subsets: ["latin"],
});

export {
  inria_serif_bold,
  inria_serif_bold_italic,
  inria_serif_light,
  inria_serif_light_italic,
  inria_serif_regular,
  inria_serif_regular_italic,
  inter_bold,
  inter_extra_bold,
  inria_serif_extra_bold,
  inria_serif_medium,
};
