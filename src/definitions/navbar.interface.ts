export interface NavbarItemInterface {
  label: string;
  path: string;
  icon?: string;
}

export const navbarItems: NavbarItemInterface[] = [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'Spaces',
    path: '/spaces'
  }
];
