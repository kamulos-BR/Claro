import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayersComponent} from './players/players.component';
import {PlayersModule} from './players/players.module';

const routes: Routes = [
  {
    path: '**', component: PlayersComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PlayersModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
