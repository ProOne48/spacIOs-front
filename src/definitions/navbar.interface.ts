import { AuthService } from '../services/auth/auth.service';

export interface NavbarItemInterface {
  label?: string;
  path: string;
  icon: string;
  show?: boolean;
  dataCy?: string;
}

export const navbarItems: NavbarItemInterface[] = [
  {
    label: 'Search',
    icon: 'search',
    path: '/public/space',
    show: true,
    dataCy: 'navbar-search'
  },
  {
    label: 'Home',
    icon: 'home',
    path: '/home',
    show: !!AuthService.getSpaceOwnerData(),
    dataCy: 'navbar-home'
  }
];
