import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Database, FileText, Users, Code, Info, Home } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Policies', path: '/policies', icon: FileText },
  { name: 'Datasets', path: '/datasets', icon: Database },
  { name: 'Impact Explorer', path: '/impact', icon: Users },
  { name: 'Agencies', path: '/agencies', icon: Search },
  { name: 'Developers', path: '/developers', icon: Code },
  { name: 'About', path: '/about', icon: Info },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 card-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Database className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-primary text-lg tracking-tight hidden sm:block">
                Nigeria Data Observatory
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "text-primary bg-slate-50"
                    : "text-text-secondary hover:text-primary hover:bg-slate-50"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-secondary hover:text-primary p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === item.path
                    ? "text-primary bg-slate-50"
                    : "text-text-secondary hover:text-primary hover:bg-slate-50"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
