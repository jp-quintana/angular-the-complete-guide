import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
export class NewTicketComponent implements OnInit, AfterViewInit {
  @ViewChild('form') private form!: ElementRef<HTMLFormElement>;
  // private form = viewChild('form'); ---> nuevo y es la variacion signal
  @Output() add = new EventEmitter<{ title: string; text: string }>();
  // add = output<{title: string, text: string}>

  enteredTitle = '';
  enteredText = '';

  ngOnInit(): void {
    console.log('ON INIT');
  }

  ngAfterViewInit(): void {
    console.log('AFTER VIEW INIT');
  }

  // onSubmit(title: string, ticketText: string) {
  //   this.add.emit({ title, text: ticketText });
  //   this.form.nativeElement.reset();
  // }

  // two-way binding
  onSubmit() {
    this.add.emit({ title: this.enteredTitle, text: this.enteredText });
    this.enteredTitle = '';
    this.enteredText = '';
  }
}
