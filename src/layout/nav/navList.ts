import { LinkText, MainPath } from './enums';

const navList = [
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

const authItemsList = [
  {
    path: MainPath.Login,
    linkText: LinkText.Login,
  },
  {
    path: MainPath.Register,
    linkText: LinkText.Signup,
  },
];

export { authItemsList, navList };
