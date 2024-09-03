import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: 'Status',
      activeMenu: '/index',
      icon: 'home'
    },
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/system/overview/index'),
        name: 'index',
        meta: {
          title: 'Overview',
          noCache: true,
          roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
        }

      },
      {
        path: 'system-log',
        component: () => import('@/views/system/system-log'),
        name: 'SystemLog',
        meta: {
          title: 'System Log',
          noCache: true,
          roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
        }
      },
      {
        path: 'kernel-log',
        component: () => import('@/views/system/kernel-log'),
        name: 'KernelLog',
        meta: {
          title: 'Kernel Log',
          noCache: true,
          roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
        }
      },
      {
        path: 'live-clients',
        component: () => import('@/views/system/live-clients'),
        name: 'LiveClients',
        meta: {
          title: 'Live-Clients',
          noCache: true,
          roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
        }
      }
    ]
  },
  {
    path: '/quick-setup',
    component: Layout,
    name: 'QuickSetup',
    alwaysShow: true,
    meta: {
      title: 'Quick Setup',
      activeMenu: '/operation-mode',
      icon: 'setup'
    },
    redirect: '/quick-setup/operation-mode',
    children: [
      {
        path: 'operation-mode',
        component: () => import('@/views/quick-setup/index'),
        name: 'operation-mode',
        meta: {
          title: 'Operation Mode',
          noCache: true,
          roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
        }

      }
    ]
  },
  {
    path: '/network',
    component: Layout,
    redirect: '/network/interfaces',
    name: 'network',
    alwaysShow: true,
    meta: {
      title: 'Network',
      icon: 'network',
      activeMenu: '/network/interfaces'
    },
    children: [
      {
        path: 'interfaces',
        component: () => import('@/views/network/interfaces/index'),
        name: 'InterfacesIndex',
        meta: {
          noCache: true,
          title: 'Interfaces',
          roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
        }
      },
      {
        path: '/network/vlan',
        component: () => import('@/views/network/vlan/index'),
        name: 'VLanIndex',
        redirect: '/network/vlan/',
        meta: {
          title: 'Vlan',
          roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
        },
        children: [
          {
            path: '/network/vlan/',
            component: () => import('@/views/network/vlan/home'),
            name: 'VLanHome',
            hidden: true,
            meta: {
              title: '',
              roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
            }
          },
          {
            path: '/network/vlan/edit',
            hidden: true,
            component: () => import('@/views/network/vlan/edit'),
            name: 'VLanEdit',
            meta: {
              title: 'Edit',
              noCache: true,
              roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
            }
          }
        ]
      },
      {
        path: '/network/static-routes',
        component: () => import('@/views/network/static-routes/index'),
        name: 'StaticRoutesIndex',
        meta: {
          title: 'Static Routes',
          roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
        }
      },
      {
        path: '/network/firewall',
        component: () => import('@/views/network/firewall/index'),
        name: 'FirewallIndex',
        meta: {
          title: 'Firewall'
        },
        redirect: '/network/firewall/',
        title: 'Firewall',
        children: [
          {
            path: '/network/firewall/',
            component: () => import('@/views/network/firewall/home'),
            name: 'FirewallHome',
            hidden: true,
            meta: {
              title: '',
              roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
            }
          },
          {
            path: '/network/firewall/zone-edit',
            hidden: true,
            component: () => import('@/views/network/firewall/zone-edit'),
            name: 'ZoneEdit',
            meta: {
              title: 'ZoneEdit',
              noCache: true,
              roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
            }
          },
          {
            path: '/network/firewall/redirect-edit',
            hidden: true,
            component: () => import('@/views/network/firewall/redirect-edit'),
            name: 'RedirectEdit',
            meta: {
              title: 'RedirectEdit',
              noCache: true,
              roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
            }
          },
          {
            path: '/network/firewall/pforwards-edit',
            hidden: true,
            component: () => import('@/views/network/firewall/port-forwards-edit'),
            name: 'PortForwardsEdit',
            meta: {
              title: 'PortForwardsEdit',
              noCache: true,
              roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
            }
          }
        ]
      },
      {
        path: '/network/lan-clients',
        component: () => import('@/views/network/lan-clients'),
        name: 'NetworkLanClients',
        meta: {
          title: 'Lan-Clients',
          roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
        }
      },
      {
        path: 'iface_add',
        hidden: true,
        component: () => import('@/views/network/add/index'),
        name: 'iface_add',
        meta: {
          title: 'iface_add',
          roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
        }
      }
    ]
  },
  {
    path: '/ethernet',
    component: Layout,
    redirect: '/ethernet/ports',
    name: 'Ethernet',
    alwaysShow: true,
    meta: {
      title: 'Ethernet',
      icon: 'network',
      activeMenu: '/ethernet/ports'
    },
    children: [
      {
        path: '/ethernet/ports',
        component: () => import('@/views/ethernet/ports/index'),
        name: 'PortsIndex',
        redirect: '/network/ports/',
        meta: {
          title: 'Ports',
          roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
        },
        children: [
          {
            path: '/ethernet/ports/',
            component: () => import('@/views/ethernet/ports/home'),
            name: 'PortsHome',
            hidden: true,
            meta: {
              title: '',
              roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
            }
          }
        ]
      }
    ]
  },
  {
    path: '/wireless',
    component: Layout,
    redirect: '/wireless/radio',
    alwaysShow: true, // will always show the root menu
    name: 'wireless',
    meta: {
      activeMenu: '/wireless/radio',
      title: 'Wireless',
      icon: 'wireless'
    },
    children: [
      {
        path: 'radio',
        component: () => import('@/views/wireless/radio/index'),
        name: 'RadioIndex',
        meta: {
          title: 'Radio',
          noCache: true,
          roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
        }
      },
      {
        path: '/wireless/ap',
        component: () => import('@/views/wireless/ap/layout'),
        name: 'WirelessAPLayout',
        redirect: '/wireless/ap/',
        meta: {
          title: 'AP',
          roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
        },
        children: [
          {
            path: '/wireless/ap/',
            component: () => import('@/views/wireless/ap/index'),
            name: 'APIndex',
            hidden: true,
            meta: {
              title: '',
              roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
            }
          },
          {
            path: '/wireless/ap/edit',
            hidden: true,
            component: () => import('@/views/wireless/ap/ap_edit'),
            name: 'APEdit',
            meta: {
              // 嵌套keep-alive 情况下， noCache参数无效
              noCache: true,
              title: 'Edit',
              roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
            }
          }
        ]
      },
      {
        path: '/wireless/sta',
        component: () => import('@/views/wireless/sta/layout'),
        name: 'STALayout',
        redirect: '/wireless/sta/',
        meta: {
          title: 'STA'
        },
        children: [
          {
            path: '/wireless/sta/',
            component: () => import('@/views/wireless/sta/index'),
            name: 'STAIndex',
            hidden: true,
            meta: {
              title: '',
              roles: ['ap-iac', 'sta-iac', 'router', 'client', 'sta']
            }
          },
          {
            path: '/wireless/sta/edit',
            component: () => import('@/views/wireless/sta/sta-ap-edit'),
            name: 'STAAPEdit',
            hidden: true,
            meta: {
              noCache: true,
              title: 'Edit',
              roles: ['ap-iac', 'sta-iac', 'router', 'client', 'sta']
            }
          }
        ]
      },
      {
        path: '/wireless/clients',
        component: () => import('@/views/wireless/clients/index'),
        name: 'WirelessClients',
        meta: {
          title: 'WLAN-Clients',
          noCache: true,
          roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client', 'sta']
        }
      }
    ]
  },
  {
    path: '/nhxap-iac',
    component: Layout,
    redirect: '/nhxap-iac/ap-group',
    alwaysShow: true, // will always show the root menu
    name: 'nhxap-iac',
    meta: {
      activeMenu: '/nhxap-iac/ap-group',
      title: 'NHXAP-IAC',
      icon: 'app',
      roles: ['ap-iac']
    },
    children: [
      {
        path: '/nhxap-iac/ap-group',
        component: () => import('@/views/nhx-iac/group/index'),
        name: 'group',
        redirect: '/nhxap-iac/ap-group/',
        meta: {
          title: 'AP-Group',
          roles: ['ap-iac'],
          noCache: true
        },
        children: [
          {
            path: '/nhxap-iac/ap-group/',
            component: () => import('@/views/nhx-iac/group/group-home'),
            name: 'GroupHome',
            hidden: true,
            meta: {
              title: '',
              roles: ['ap-iac'],
              noCache: true
            }
          },
          {
            path: '/nhxap-iac/ap-group/groupRadio',
            component: () => import('@/views/nhx-iac/group-radio/index'),
            name: 'groupRadio',
            hidden: true,
            meta: {
              title: 'Radio',
              roles: ['ap-iac'],
              noCache: true
            }
          },
          {
            path: '/nhxap-iac/ap-group/groupGeneralConfig',
            component: () => import('@/views/nhx-iac/groupGeneral-config/index'),
            name: 'groupGeneralConfig',
            hidden: true,
            meta: {
              title: 'General',
              roles: ['ap-iac'],
              noCache: true
            }
          },
          {
            path: '/nhxap-iac/ap-group/groupAp',
            component: () => import('@/views/nhx-iac/group-ap/layout'),
            name: 'GroupAP',
            redirect: '/nhxap-iac/ap-group/groupAp/',
            hidden: true,
            meta: {
              title: 'Ap',
              roles: ['ap-iac'],
              noCache: true
            },
            children: [
              {
                path: '/nhxap-iac/ap-group/groupAp/',
                component: () => import('@/views/nhx-iac/group-ap/index'),
                name: 'GroupAPIndex',
                hidden: true,
                meta: {
                  title: '',
                  roles: ['ap-iac'],
                  noCache: true
                }
              },
              {
                path: '/nhxap-iac/ap-group/groupAp/edit',
                component: () => import('@/views/nhx-iac/group-ap/ap_edit'),
                name: 'GroupAPEdit',
                hidden: true,
                meta: {
                  title: 'Edit',
                  roles: ['ap-iac'],
                  noCache: true
                }
              }
            ]
          }
        ]
      },
      {
        path: '/nhxap-iac/ap-device',
        component: () => import('@/views/nhx-iac/device/index'),
        name: 'DeviceIndex',
        redirect: '/nhxap-iac/ap-device/',
        meta: {
          title: 'AP-Device',
          roles: ['ap-iac']
        },
        children: [
          {
            path: '/nhxap-iac/ap-device/',
            component: () => import('@/views/nhx-iac/device/device-home'),
            name: 'DeviceHome',
            hidden: true,
            meta: {
              title: '',
              roles: ['ap-iac'],
              noCache: true
            }
          },
          {
            path: '/nhxap-iac/ap-device/details',
            component: () => import('@/views/nhx-iac/device/layout'),
            name: 'DeviceLayout',
            redirect: '/nhxap-iac/ap-device/details/index',
            hidden: true,
            meta: {
              title: '',
              roles: ['ap-iac'],
              noCache: true
            },
            children: [
              {
                path: '/nhxap-iac/ap-device/details/index',
                hidden: true,
                component: () => import('@/views/nhx-iac/device/device-details'),
                name: 'DeviceDetails',
                meta: {
                  title: 'Status',
                  roles: ['ap-iac'],
                  noCache: true
                }
              },
              {
                path: '/nhxap-iac/ap-device/details/edit',
                hidden: true,
                component: () => import('@/views/nhx-iac/device/device-edit'),
                name: 'DeviceDeEdit',
                meta: {
                  title: 'Edit',
                  roles: ['ap-iac'],
                  noCache: true
                }
              }
            ]
          }
        ]
      },
      {
        path: '/nhxap-iac/wireless-clients',
        component: () => import('@/views/nhx-iac/clients'),
        name: 'clients',
        meta: {
          title: 'WLAN-Clients',
          roles: ['ap-iac'],
          noCache: true
        }
      },
      {
        path: '/nhxap-iac/iac-status',
        component: () => import('@/views/public/iac-status'),
        name: 'IACStatus',
        meta: {
          title: 'IAC Status',
          roles: ['ap-iac']
        }
      },
      {
        path: '/nhxap-iac/wlanmap',
        component: () => import('@/views/nhx-iac/wlanmap/index'),
        name: 'wlanmap',
        meta: {
          title: 'WLAN-Map',
          roles: ['ap-iac']
        }
      }
    ]
  },
  {
    path: '/nhxsta-iac',
    component: Layout,
    redirect: '/nhxsta-iac/sta-group',
    alwaysShow: true, // will always show the root menu
    name: 'nhxsta-iac',
    meta: {
      activeMenu: '/nhxsta-iac/sta-group',
      title: 'NHXSTA-IAC',
      icon: 'app',
      roles: ['sta-iac']
    },
    children: [
      {
        path: '/nhxsta-iac/sta-group',
        component: () => import('@/views/nhxsta-iac/group/index'),
        name: 'group',
        redirect: '/nhxsta-iac/sta-group/',
        meta: {
          title: 'STA-Group',
          roles: ['sta-iac'],
          noCache: true
        },
        children: [
          {
            path: '/nhxsta-iac/sta-group/',
            component: () => import('@/views/nhxsta-iac/group/group-home'),
            name: 'GroupHome',
            hidden: true,
            meta: {
              title: '',
              roles: ['sta-iac'],
              noCache: true
            }
          },
          {
            path: '/nhxsta-iac/sta-group/groupRadio',
            component: () => import('@/views/nhxsta-iac/group-radio/index'),
            name: 'groupRadio',
            hidden: true,
            meta: {
              title: 'Radio',
              roles: ['sta-iac'],
              noCache: true
            }
          },
          {
            path: '/nhxsta-iac/sta-group/groupGeneralConfig',
            component: () => import('@/views/nhxsta-iac/groupGeneral-config/index'),
            name: 'groupGeneralConfig',
            hidden: true,
            meta: {
              title: 'General',
              roles: ['sta-iac'],
              noCache: true
            }
          },
          {
            path: '/nhxsta-iac/sta-group/groupAp',
            component: () => import('@/views/nhxsta-iac/group-ap/layout'),
            name: 'GroupAP',
            redirect: '/nhxsta-iac/sta-group/groupAp/',
            hidden: true,
            meta: {
              title: 'STA',
              roles: ['sta-iac'],
              noCache: true
            },
            children: [
              {
                path: '/nhxsta-iac/sta-group/groupAp/',
                component: () => import('@/views/nhxsta-iac/group-ap/index'),
                name: 'GroupAPIndex',
                hidden: true,
                meta: {
                  title: '',
                  roles: ['sta-iac'],
                  noCache: true
                }
              },
              {
                path: '/nhxsta-iac/sta-group/groupAp/edit',
                component: () => import('@/views/nhxsta-iac/group-ap/ap_edit'),
                name: 'GroupAPEdit',
                hidden: true,
                meta: {
                  title: 'Edit',
                  roles: ['sta-iac'],
                  noCache: true
                }
              }
            ]
          }
        ]
      },
      {
        path: '/nhxsta-iac/sta-device',
        component: () => import('@/views/nhxsta-iac/device/index'),
        name: 'DeviceIndex',
        redirect: '/nhxsta-iac/sta-device/',
        meta: {
          title: 'STA-Device',
          roles: ['sta-iac']
        },
        children: [
          {
            path: '/nhxsta-iac/sta-device/',
            component: () => import('@/views/nhxsta-iac/device/device-home'),
            name: 'DeviceHome',
            hidden: true,
            meta: {
              title: '',
              roles: ['sta-iac'],
              noCache: true
            }
          },
          {
            path: '/nhxsta-iac/sta-device/details',
            component: () => import('@/views/nhxsta-iac/device/layout'),
            name: 'DeviceLayout',
            redirect: '/nhxsta-iac/sta-device/details/index',
            hidden: true,
            meta: {
              title: '',
              roles: ['sta-iac'],
              noCache: true
            },
            children: [
              {
                path: '/nhxsta-iac/sta-device/details/index',
                hidden: true,
                component: () => import('@/views/nhxsta-iac/device/device-details'),
                name: 'DeviceDetails',
                meta: {
                  title: 'Status',
                  roles: ['sta-iac'],
                  noCache: true
                }
              },
              {
                path: '/nhxsta-iac/sta-device/details/edit',
                hidden: true,
                component: () => import('@/views/nhxsta-iac/device/device-edit'),
                name: 'DeviceDeEdit',
                meta: {
                  title: 'Edit',
                  roles: ['sta-iac'],
                  noCache: true
                }
              }
            ]
          }
        ]
      },

      {
        path: '/nhxsta-iac/ethernet-clients',
        component: () => import('@/views/nhxsta-iac/clients'),
        name: 'clients',
        meta: {
          title: 'Ethernet Clients',
          roles: ['sta-iac']
        }
      },
      {
        path: '/nhxsta-iac/iac-status',
        component: () => import('@/views/public/iac-status'),
        name: 'IACStatus',
        meta: {
          title: 'IAC Status',
          roles: ['ap-iac']
        }
      }
    ]
  },
  {
    path: '/nhx-mesh',
    component: Layout,
    redirect: '/nhx-mesh/network',
    alwaysShow: true, // will always show the root menu
    name: 'NHX-Mesh',
    meta: {
      activeMenu: '/nhx-mesh/network',
      title: 'NHX-Mesh',
      icon: 'app',
      roles: ['mesh']
    },
    children: [
      {
        path: '/nhx-mesh/network',
        component: () => import('@/views/nhx-mesh/network/index'),
        name: 'NHXMeshNetwork',
        meta: {
          title: 'Network',
          roles: ['mesh'],
          noCache: true
        }
      },
      {
        path: '/nhx-mesh/config',
        component: () => import('@/views/nhx-mesh/config/index'),
        name: 'NHXMeshConfig',
        redirect: '/nhx-mesh/config/',
        meta: {
          title: 'Config',
          roles: ['mesh'],
          noCache: true
        },
        children: [
          {
            path: '/nhx-mesh/config/',
            component: () => import('@/views/nhx-mesh/config/config-home'),
            name: 'ConfigHome',
            hidden: true,
            meta: {
              title: '',
              roles: ['mesh'],
              noCache: true
            }
          },
          {
            path: '/nhx-mesh/config/radio',
            component: () => import('@/views/nhx-mesh/config/radio/index'),
            name: 'ConfigRadio',
            hidden: true,
            meta: {
              title: 'Radio',
              roles: ['mesh'],
              noCache: true
            }
          },
          {
            path: '/nhx-mesh/config/general',
            component: () => import('@/views/nhx-mesh/config/general/index'),
            name: 'GeneralIndex',
            hidden: true,
            meta: {
              title: 'General',
              roles: ['mesh'],
              noCache: true
            }
          },
          {
            path: '/nhx-mesh/config/sta',
            component: () => import('@/views/nhx-mesh/config/ap/layout'),
            name: 'NHXMeshConfigAPLayout',
            redirect: '/nhx-mesh/config/ap/',
            hidden: true,
            meta: {
              title: 'Ap',
              roles: ['mesh'],
              noCache: true
            },
            children: [
              {
                path: '/nhx-mesh/config/ap/',
                component: () => import('@/views/nhx-mesh/config/ap/index'),
                name: 'NHXMeshConfigAPIndex',
                hidden: true,
                meta: {
                  title: '',
                  roles: ['mesh'],
                  noCache: true
                }
              },
              {
                path: '/nhx-mesh/config/ap/edit',
                component: () => import('@/views/nhx-mesh/config/ap/edit'),
                name: 'NHXMeshConfigAPEdit',
                hidden: true,
                meta: {
                  title: 'Edit',
                  roles: ['mesh'],
                  noCache: true
                }
              }
            ]
          }
        ]
      },
      {
        path: '/nhx-mesh/device',
        component: () => import('@/views/nhx-mesh/device/index'),
        name: 'NHXMeshDevice',
        redirect: '/nhx-mesh/device/',
        meta: {
          title: 'Device',
          roles: ['mesh']
        },
        children: [
          {
            path: '/nhx-mesh/device/',
            component: () => import('@/views/nhx-mesh/device/device-home'),
            name: 'NHXMeshDeviceHome',
            hidden: true,
            meta: {
              title: '',
              roles: ['mesh'],
              noCache: true
            }
          },
          {
            path: '/nhx-mesh/device/details',
            component: () => import('@/views/nhx-mesh/device/details/layout'),
            name: 'DeviceDetailsLayout',
            redirect: '/nhx-mesh/device/details/index',
            hidden: true,
            meta: {
              title: '',
              roles: ['mesh'],
              noCache: true
            },
            children: [
              {
                path: '/nhx-mesh/device/details/index',
                hidden: true,
                component: () => import('@/views/nhx-mesh/device/details/index'),
                name: 'NHXMeshDeviceDetailsIndex',
                meta: {
                  title: 'Status',
                  roles: ['mesh'],
                  noCache: true
                }
              },
              {
                path: '/nhx-mesh/device/details/edit',
                hidden: true,
                component: () => import('@/views/nhx-mesh/device/details/edit'),
                name: 'NHXMeshDeviceDetailsEdit',
                meta: {
                  title: 'Edit',
                  roles: ['mesh'],
                  noCache: true
                }
              }
            ]
          }
        ]
      },
      {
        path: '/nhx-mesh/clients',
        component: () => import('@/views/nhx-mesh/clients/index'),
        name: 'NHXMeshClients',
        meta: {
          title: 'Wlan-Clients',
          roles: ['mesh']
        }
      },
      {
        path: '/nhx-mesh/iac-status',
        component: () => import('@/views/public/iac-status'),
        name: 'IACStatus',
        meta: {
          title: 'IAC Status',
          roles: ['ap-iac']
        }
      }
    ]
  },
  {
    path: '/services',
    component: Layout,
    redirect: '/services/UPnP',
    name: 'services',
    alwaysShow: true,
    meta: {
      activeMenu: '/services/UPnP',
      title: 'Services',
      icon: 'services',
      roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client']
    },
    children: [
      {
        path: 'UPnP',
        component: () => import('@/views/services/index'),
        name: 'UPnP',
        meta: {
          title: 'UPnP',
          roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client']
        }
      }
    ]
  },

  {
    path: '/system-tools',
    component: Layout,
    redirect: '/system-tools/flashops',
    name: 'system-tools',
    alwaysShow: true,
    meta: {
      title: 'System',
      icon: 'system',
      activeMenu: '/system-tools/flashops',
      roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client']
    },
    children: [
      {
        path: 'flashops',
        component: () => import('@/views/system-tools/flash/index'),
        name: 'flash',
        meta: {
          title: 'Backup/Flash Firmware',
          roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client']
        }
      }
    ]
  },
  {
    path: '/nhx-config',
    component: Layout,
    redirect: '/nhx-config/json-edit',
    name: 'NHXConfig',
    hidden: true,
    meta: {
      title: 'NHX config',
      icon: 'system',
      roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client']
    },
    children: [
      {
        path: 'json-edit',
        component: () => import('@/views/advance/json-edit'),
        name: 'JSON-Edit',
        meta: {
          title: 'JSON edit',
          roles: ['ap-iac', 'sta-iac', 'router', 'ap', 'client']
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
