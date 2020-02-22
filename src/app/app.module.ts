import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms';
import { MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule, MatProgressBarModule } from '@angular/material';


//servicios
import { ClientesService } from './services/clientes.service';
import { MaterialesService } from './services/materiales.service';
import { ExcelService } from './services/excel.service'
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { HerramientasComponent } from './components/herramientas/herramientas.component';
import { CrearOrdenComponent } from './components/ordenes/crear-orden/crear-orden.component';
import { TipoOrdenComponent } from './components/herramientas/tipo-orden/tipo-orden.component';
import { ListarOrdenesComponent } from './components/ordenes/listar-ordenes/listar-ordenes.component';
import { DetalleOrdenComponent } from './components/ordenes/detalle-orden/detalle-orden.component';
import { DoinOrdenComponent } from './components/ordenes/doin-orden/doin-orden.component';
import { EditarOrdenComponent } from './components/ordenes/editar-orden/editar-orden.component';
import { PlataformaComponent } from './components/herramientas/plataforma/plataforma.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { interceptorProvider } from './services/vistas-interceptor.service';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { GuardService as guard} from './guards/guard.service';
import { UserComponent } from './components/users/user/user.component';
import { AdminComponent } from './components/users/admin/admin.component';
import { DetalleAdminComponent } from './components/ordenes/detalle-admin/detalle-admin.component';
import { AjustesComponent } from './components/ajustes/ajustes/ajustes.component';
import { UsuariosComponent } from './components/ajustes/usuarios/usuarios/usuarios.component';
import { ReportesComponent } from './components/reportes/reportes/reportes.component';
import { EstadisticasComponent } from './components/reportes/estadisticas/estadisticas.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'inicio', component: InicioComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
  { path: 'ordenes', component: OrdenesComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']} },
  { path: 'ordenes/crear', component: CrearOrdenComponent, canActivate: [guard], data: { expectedRol: ['admin']}},
  { path: 'ordenes/edit/:id', component: EditarOrdenComponent, canActivate: [guard], data: { expectedRol: ['admin']}},
  { path: 'ordenes/listar', component: ListarOrdenesComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']} },
  { path: 'ordenes/listar/:user', component: ListarOrdenesComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']} },
  { path: 'ordenes/info/:id', component: DetalleAdminComponent, canActivate: [guard], data: { expectedRol: ['admin']}},
  { path: 'ordenes/detalle/:id', component: DetalleOrdenComponent, canActivate: [guard], data: { expectedRol: ['user']}},
  { path: 'ordenes/doin/:id', component: DoinOrdenComponent, canActivate: [guard], data: { expectedRol: ['user']} },
  { path: 'herramientas', component: HerramientasComponent, canActivate: [guard], data: { expectedRol: ['admin']}},
  { path: 'herramientas/edit/:id', component: HerramientasComponent, canActivate: [guard], data: { expectedRol: ['admin']}},
  { path: 'reportes', component: ReportesComponent, canActivate: [guard], data: { expectedRol: ['admin']}},
  { path: 'reportes/estadisticas', component: EstadisticasComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']}},
  { path: 'plataforma', component: PlataformaComponent, canActivate: [guard], data: { expectedRol: ['admin']}},
  { path: 'ajustes', component: AjustesComponent, canActivate: [guard], data: { expectedRol: ['admin']}},
  { path: 'usuarios', component: UsuariosComponent, canActivate: [guard], data: { expectedRol: ['admin']}},
  { path: 'usuarios/edit/:id', component: UsuariosComponent, canActivate: [guard], data: { expectedRol: ['admin']}},

  

  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'inicio'}

]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    OrdenesComponent,
    HerramientasComponent,
    CrearOrdenComponent,
    TipoOrdenComponent,
    ListarOrdenesComponent,
    DetalleOrdenComponent,
    DoinOrdenComponent,
    EditarOrdenComponent,
    PlataformaComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    DetalleAdminComponent,
    AjustesComponent,
    UsuariosComponent,
    ReportesComponent,
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AutocompleteLibModule,
    MDBBootstrapModule.forRoot(),
    MatToolbarModule,  
    MatIconModule,  
    MatButtonModule,  
    MatCardModule,  
    MatProgressBarModule,
    NgxPaginationModule
  ],
  providers: [
    ClientesService,
    MaterialesService,
    DatePipe,
    interceptorProvider,
    guard,
    ExcelService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
