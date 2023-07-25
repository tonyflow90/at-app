import { base } from "$app/paths";

type Route = {
  name: string;
  path: string;
};

export const routes: Route[] = [
  {
    name: "Home",
    path: `${base}/`,
  },
  {
    name: "Activities",
    path: `${base}/activities`,
  },
];