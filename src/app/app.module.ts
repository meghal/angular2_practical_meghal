import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { fakeBackendProvider, JwtInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { HeaderTemplateComponent } from './components/header-template/header-template.component';
import { FooterTemplateComponent } from './components/footer-template/footer-template.component';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        FieldErrorDisplayComponent,
        HeaderTemplateComponent,
        FooterTemplateComponent,
        ImageCropperComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
