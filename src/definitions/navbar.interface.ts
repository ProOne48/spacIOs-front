export interface NavbarItemInterface {
  label: string;
  path: string;
  icon?: string;
}

export const navbarItems: NavbarItemInterface[] = [
  {
    label: 'Home',
    path: '/home'
  },
  {
    label: 'Spaces',
    path: '/spaces'
  }
];
