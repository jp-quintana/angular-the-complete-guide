import { Component, ElementRef, viewChild, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent {
  @ViewChild('form') private form!: ElementRef<HTMLFormElement>;
  // private form = viewChild('form'); ---> nuevo y es la variacion signal

  onSubmit(title: string, ticketText: String) {
    console.log(title, ticketText);
    this.form.nativeElement.reset();
  }
}
