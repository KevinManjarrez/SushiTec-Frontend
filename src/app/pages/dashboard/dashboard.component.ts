import { Component } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';
import { Nav2Component } from '../../shared/nav2/nav2.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Nav2Component],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
