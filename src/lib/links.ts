import { base } from "$app/paths";

type Link = {
  name: string;
  path: string;
  cssClasses: string;
};

export const appLinks: Link[] = [
  {
    name: "Home",
    path: `${base}/`,
    cssClasses: "fa-sharp fa-solid fa-house",
  },
  {
    name: "Favorites",
    path: `${base}/favorites`,
    cssClasses: "fa-sharp fa-solid fa-heart",
  },
  {
    name: "Recipes",
    path: `${base}/recipes`,
    cssClasses: "fa-sharp fa-solid fa-book",
  },
  {
    name: "Categories",
    path: `${base}/categories`,
    cssClasses: "fa-sharp fa-solid fa-tag",
  },
  {
    name: "Ingredients",
    path: `${base}/ingredients`,
    cssClasses: "fa-sharp fa-solid fa-leaf",
  },
];

export const userLinks: Link[] = [
  {
    name: "Your Profile",
    path: `${base}/profile`,
    cssClasses: "fa-sharp fa-solid fa-house",
  },
  {
    name: "Settings",
    path: `${base}/settings`,
    cssClasses: "fa-sharp fa-solid fa-heart",
  }
];