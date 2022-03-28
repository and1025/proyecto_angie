
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { ActaComponent } from "./acta/acta.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { ActaListaComponent } from "./acta-lista/acta-lista.component";
const AppRoutingModule = [

  { path: "", component: AppComponent, pathMatch: "full" },
  { path: "acta", component: ActaComponent, pathMatch: "full" },
  { path: "acta-lista", component: ActaListaComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full" }
];
export const routing = RouterModule.forRoot(AppRoutingModule);
