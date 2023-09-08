import { AuthService } from '../services/auth/auth.service';

export interface NavbarItemInterface {
  label?: string;
  path: string;
  icon: string;
  show?: boolean;
}

export const navbarItems: NavbarItemInterface[] = [
  {
    label: 'Home',
    icon: 'home',
    path: '/home',
    show: !!AuthService.getSpaceOwnerData()
  },
  {
    label: 'Search',
    icon: 'search',
    path: '/search',
    show: true
  }
];
