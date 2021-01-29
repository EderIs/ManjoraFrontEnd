import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  
  {
    name:'Contactos',
    url: '/contacto',
    icon: 'icon-speedometer'
  },
  {
    name: 'Configuracion',
    url: '/Dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    },
children:[
  {
    name: 'Titulos',
    url: 'contacto/titulo/listaTitulo',
    icon: 'icon-speedometer',
    
  },
  {
    title: true,
    name: 'Localización',
  },
  {
    name: 'Paises',
    url: 'contacto/pais/listarPais',
    icon: 'icon-speedometer',
    
  },
  {
    name: 'Estados',
    url: '/contacto/estado/listarEstado',
    icon: 'icon-speedometer',
    
  },
  {
    title: true,
    name: 'Cuentas Bancarias',
  },
  {
    name: 'Cuentas Bancarias',
    url: '/dashboard',
    icon: 'icon-speedometer',
    
  },
  {
    name: 'Bancos',
    url: 'contacto/banco/listarBanco',
    icon: 'icon-speedometer',
    
  },
]
    },
    {
      name:'Empleados',
      url: '/empleado',
      icon: 'icon-speedometer'
    },
    {
      name: 'Configuracion',
      url: '/Dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      },
  children:[
    {
      name: 'Departamentos',
      url: 'empleado/departamento/listarDepartamento',
      icon: 'icon-speedometer'
    },
    {
      name: 'Puestos',
      url: 'empleado/puesto/listarPuesto',
      icon: 'icon-speedometer'
    },
    {
      name: 'Horas Laborales',
      url: 'empleado/horasL/listarHorasL',
      icon: 'icon-speedometer'
    },
    {
      name: 'Horario Trabajo',
      url: 'empleado/horarioT/listarHorarioT',
      icon: 'icon-speedometer'
    },
  ]
      },
    {
      title: true,
      name: 'Ajustes',
  },
    {
      name:'Ajustes',
      url: '/ajuste',
      icon: 'icon-speedometer'
    }  
];