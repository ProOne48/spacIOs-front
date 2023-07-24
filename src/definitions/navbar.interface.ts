export interface NavbarItemInterface {
  label: string;
  path: string;
  icon: string;
}

export const navbarItems: NavbarItemInterface[] = [
  {
    label: 'Home',
    icon: 'home',
    path: '/home'
  },
  {
    label: 'Spaces',
    icon: 'space',
    path: '/space'
  }
];
