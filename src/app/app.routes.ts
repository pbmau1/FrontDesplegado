import { Routes } from '@angular/router';
import { Usuario } from './components/usuario/usuario';
import { usuariolistar } from './components/usuario/usuariolistar/usuariolistar';
import { usuarioregistrar } from './components/usuario/usuarioregistrar/usuarioregistrar';
import { operacionModel } from './models/operacionModel';
import { OperacionList } from './components/operacion/operacion-listar/operacion-list';
import { OperacionRegistrar } from './components/operacion/operacionregistrar/operacionregistrar';
import { OperacionComponent } from './components/operacion/operacion';
import { BalanceList } from './components/balance/balance-list/balance-list';
import { BalanceInsert } from './components/balance/balance-insert/balance-insert';
import { Balance } from './components/balance/balance';
import { Ahorro } from './components/ahorro/ahorro';
import { AhorroList } from './components/ahorro/ahorro-list/ahorro-list';
import { AhorroInsert } from './components/ahorro/ahorro-insert/ahorro-insert';
import { Recurso } from './components/recurso/recurso';
import { Recursolistar } from './components/recurso/recursolistar/recursolistar';
import { Recursoregistrar } from './components/recurso/recursoregistrar/recursoregistrar';
import { ImpuestoList } from './components/impuesto/impuesto-list/impuesto-list';
import { ImpuestoInsert } from './components/impuesto/impuesto-insert/impuesto-insert';
import { Impuesto } from './components/impuesto/impuesto';
import { Impuestooperacion } from './components/impuestooperacion/impuestooperacion';
import { ImpuestooperacionList } from './components/impuestooperacion/impuestooperacion-list/impuestooperacion-list';
import { ImpuestooperacionInsert } from './components/impuestooperacion/impuestooperacion-insert/impuestooperacion-insert';
import { Landigpage } from './components/landigpage/landigpage';
import { Menu } from './components/menu/menu';
import { Recursousuario } from './components/recursousuario/recursousuario';
import { RecursousuarioListar } from './components/recursousuario/recursousuario-listar/recursousuario-listar';
import { RecursousuarioRegistrar } from './components/recursousuario/recursousuario-registrar/recursousuario-registrar';
import { UsuarioBuscarComponent } from './components/usuario/usuario-buscar/usuario-buscar';
import { ReportebalanceSum } from './components/reportebalance-sum/reportebalance-sum';
import { Autenticador } from './components/autenticador/autenticador';
import { Home } from './components/home/home';
import { seguridadGuardGuard } from './seguridad/seguridad-guard';
import { ReporteBalanceMes } from './components/reporte-balance-mes/reporte-balance-mes';
import { Roles } from './components/roles/roles';
import { RolListar } from './components/roles/rol-listar/rol-listar';
import { RolServices } from './services/rol-services';
import { RolRegistrar } from './components/roles/rol-registrar/rol-registrar';
import { Consejos } from './components/consejos/consejos';
import { Recursobuscarautor } from './components/recurso/recursoautor/recursoautor';
import { Recursobuscarfecha } from './components/recurso/recursofecha/recursofecha';
import { OpeBusqueda1 } from './components/operacion/ope-busqueda1/ope-busqueda1';
import { OpeBusqueda2 } from './components/operacion/ope-busqueda2/ope-busqueda2';
import { ReporteOperacion } from './components/reporte-operacion/reporte-operacion';
import { ReporteImpuestosoperacion } from './components/reporte-impuestosoperacion/reporte-impuestosoperacion';
import { ReporteAhorroSum } from './components/reporte-ahorro-sum/reporte-ahorro-sum';
import { ReporteAhorroPeriodo } from './components/reporte-ahorro-periodo/reporte-ahorro-periodo';

export const routes: Routes = [
  { path: '', component: Landigpage },
  {
    path: 'login',
    component: Autenticador,
  },
  {
    path: 'usuarios',
    component: Usuario,
    children: [{ path: 'nuevo', component: usuarioregistrar }],
  },
  {
    path: 'app',
    component: Menu,
    canActivate: [seguridadGuardGuard],
    children: [
      { path: '', component: Consejos },
      { path: 'consejos', component: Consejos },

      { path: 'usuariolistar', component: usuariolistar },
      { path: 'edits/:id', component: usuarioregistrar },
      { path: 'perfil', component: usuarioregistrar },
      {
        path: 'buscar',
        component: UsuarioBuscarComponent,
      },

      {
        path: 'operacion',
        component: OperacionComponent,
        children: [
          { path: '', component: OperacionList },
          { path: 'nuevo', component: OperacionRegistrar },
          { path: 'edits/:id', component: OperacionRegistrar },
          { path: 'filtro1', component: OpeBusqueda1 },
          { path: 'filtro2', component: OpeBusqueda2 },
        ],
      },

      {
        path: 'balance',
        component: Balance,
        children: [
          { path: '', component: BalanceList },
          { path: 'nuevo', component: BalanceInsert },
          { path: 'edits/:id', component: BalanceInsert },
        ],
      },

      {
        path: 'ahorro',
        component: Ahorro,
        children: [
          { path: '', component: AhorroList },
          { path: 'edits/:id', component: AhorroInsert },
          { path: 'nuevo', component: AhorroInsert },
        ],
      },
      {
        path: 'recurso',
        component: Recurso,
        children: [
          { path: '', component: Recursolistar },
          { path: 'nuevo', component: Recursoregistrar },
          { path: 'edits/:id', component: Recursoregistrar },
          {
            path: 'filtrar-fecha',
            loadComponent: () =>
              import('./components/recurso/recursofecha/recursofecha').then(
                (m) => m.Recursobuscarfecha
              ),
          },
          {
            path: 'filtrar-autor',
            loadComponent: () =>
              import('./components/recurso/recursoautor/recursoautor').then(
                (m) => m.Recursobuscarautor
              ),
          },
        ],
      },

      {
        path: 'impuesto',
        component: Impuesto,
        children: [
          { path: '', component: ImpuestoList },
          { path: 'nuevo', component: ImpuestoInsert },
          { path: 'edits/:id', component: ImpuestoInsert },
        ],
      },

      {
        path: 'impuesto-operacion',
        component: Impuestooperacion,
        children: [
          { path: '', component: ImpuestooperacionList },
          { path: 'nuevo', component: ImpuestooperacionInsert },
          { path: 'edits/:id', component: ImpuestooperacionInsert },
        ],
      },

      {
        path: 'recurso-usuario',
        component: Recursousuario,
        children: [
          { path: '', component: RecursousuarioListar },
          { path: 'nuevo', component: RecursousuarioRegistrar },
          { path: 'edits/:id', component: RecursousuarioRegistrar },
        ],
      },
      {
        path: 'sumaingresos',
        component: ReportebalanceSum,
      },
      {
        path: 'listarmes',
        component: ReporteBalanceMes,
      },

      {
        path: 'sumaxusuario',
        component: ReporteOperacion,
      },
      {
        path: 'impuestomonto',
        component: ReporteImpuestosoperacion,
      },
      {
        path: 'sumaahorros',
        component: ReporteAhorroSum,
      },
      {
        path: 'ahorro-periodo',
        component: ReporteAhorroPeriodo,
      },

      {
        path: 'roles',
        component: Roles,
        children: [
          { path: '', component: RolListar },
          { path: 'nuevo', component: RolRegistrar },
          { path: 'edits/:id', component: RolRegistrar },
        ],
      },
    ],
  },
  {
    path: 'homes',
    component: Home,
    canActivate: [seguridadGuardGuard],
  },
];
