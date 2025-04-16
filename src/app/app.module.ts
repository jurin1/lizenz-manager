import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AuthService } from './services/auth.service';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [BrowserModule, RouterModule.forRoot(routes), AppComponent],
    providers: [AuthGuard, RoleGuard, AuthService, provideHttpClient()],
})
export class AppModule { }
