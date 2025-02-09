import { LinkText, MainPath } from './enums';

export const navItemsList = [
  {
    path: MainPath.Root,
    linkText: LinkText.Home,
  },
  {
    path: MainPath.Records,
    linkText: LinkText.Albums,
  },
  {
    path: MainPath.Create,
    linkText: LinkText.CreateAlbum,
  },
];

export const authItemsList = [
  {
    path: MainPath.Login,
    linkText: LinkText.Login,
  },
  {
    path: MainPath.Register,
    linkText: LinkText.Signup,
  },
];
