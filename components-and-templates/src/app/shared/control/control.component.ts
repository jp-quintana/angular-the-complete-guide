import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class ControlComponent {
  // @HostBinding('class') className = 'control'; <-- discouraged
  // @HostListener('click') onClick() {
  //   console.log('clicked')
  // } <-- discouraged
  @Input({ required: true }) label!: string;

  private el = inject(ElementRef);

  onClick() {
    console.log('clicked');
    console.log(this.el.nativeElement);
  }
}