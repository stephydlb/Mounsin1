import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Calendar, 
  User, 
  Pill, 
  Syringe, 
  Settings,
  Heart
} from 'lucide-react';

const navigation = [
  {
    name: 'Tableau de bord',
    href: '/fr/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Rendez-vous',
    href: '/fr/dashboard/appointments',
    icon: Calendar,
  },
  {
    name: 'Médecins',
    href: '/fr/dashboard/doctors',
    icon: User,
  },
  {
    name: 'Pharmacies',
    href: '/fr/dashboard/pharmacies',
    icon: Pill,
  },
  {
    name: 'Vaccinations',
    href: '/fr/dashboard/vaccinations',
    icon: Syringe,
  },
  {
    name: 'Paramètres',
    href: '/fr/dashboard/settings',
    icon: Settings,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Logo */}
      <div className="flex items-center space-x-2 px-6 py-6 border-b">
        <div className="p-2 bg-green-100 rounded-lg">
          <Heart className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h1 className="font-bold text-lg">Mounsin</h1>
          <p className="text-sm text-gray-500">Facile</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
          
          return (
            <Link key={item.name} to={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start px-4 py-3 h-auto',
                  isActive 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'hover:bg-gray-100'
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}