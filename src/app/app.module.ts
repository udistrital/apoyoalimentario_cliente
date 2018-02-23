import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AccordionModule } from "ng2-accordion";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'form', component: FormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'data', component: DataComponent },
  { path: 'documents', component: DocumentsComponent},
  { path: 'list', component: ListComponent },
  { path: 'verification', component: VerificationComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'reports', component: ReportComponent}
];

import { AppComponent } from './app.component';
// Components Common
import { LoginComponent } from './common/login/login.component';
// Components Inscription
import { DataComponent } from './inscription/data/data.component';
import { FormComponent } from './inscription/form/form.component';
import { DocumentsComponent } from './inscription/documents/documents.component';
// Components Administration
import { ListComponent } from './administrator/list/list.component';
import { VerificationComponent } from './administrator/verification/verification.component';
import { SafePipe } from './administrator/verification/pipeArchives.component';
import { ConfigurationComponent } from './administrator/configuration/configuration.component';
import { ReportComponent } from './administrator/report/report.component';
// Providers
import { Constants } from './common/constants/model.constants';
// Inscription Providers
import { StateService } from './common/services/status.service';
import { DataInformation } from './common/services/basicInformation.service';
import { DataEconomicInformation } from './common/services/economicInformation.service';
import { FileService } from './common/services/file.service';
import { Metadata } from './common/constants/metadata';
import { InscriptionComplete } from './common/services/complete.service';
// Administration Providers
import { FacultyInformation } from './common/services/faculty.service';
import { ProcessConfiguration } from './common/models/configuration.model';
import { DataConfiguration } from './common/services/configuration.service';
import { RolInformation } from './common/services/rolInformation.service';
import { Information } from './common/services/information.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    DataComponent,
    FormComponent,
    DocumentsComponent,

    ListComponent,
    VerificationComponent,
    ConfigurationComponent,
    SafePipe,
    VerificationComponent,
    ReportComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    AccordionModule,
    NgbModule.forRoot(),
    OrderModule,
    Ng2SearchPipeModule
  ],
  providers: [
              // Common Providers
              Constants,
              // Inscription Providers
              StateService,
              DataInformation,
              DataEconomicInformation,
              FileService,
              Metadata,
              InscriptionComplete,
              // Administration Providers
              ProcessConfiguration,
              DataConfiguration,
              RolInformation,
              Information,
              FacultyInformation],
  bootstrap: [AppComponent]
})
export class AppModule { }
