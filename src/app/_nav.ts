import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  
  {
    title: true,
    name: 'Contactos',
},
{
  name: 'Contactos',
  url: '/contacto',
  icon: 'icon-speedometer',
}, 
  {
    name: 'Configuracion',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    },
children:[
  {
    name: 'Titulos',
    url: '/dashboard',
    icon: 'icon-speedometer',
    
  },
  {
    name: 'Paises',
    url: '/dashboard',
    icon: 'icon-speedometer',
    
  },
  {
    name: 'Estados',
    url: '/dashboard',
    icon: 'icon-speedometer',
    
  },
  {
    name: 'Cuentas Bancarias',
    url: '/dashboard',
    icon: 'icon-speedometer',
    
  },
  {
    name: 'Bancos',
    url: '/dashboard',
    icon: 'icon-speedometer',
    
  }
]
    },
    {
      title: true,
      name: 'Empleados',
  },
    {
      name: 'Empleados',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Departamentos',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      title: true,
      name: 'Usuarios',
  },
    {
      name:'Usuarios',
      url: '/dashboard',
      icon: 'icon-speedometer'
    }  
];