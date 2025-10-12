import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent, SelectComponent, TextareaComponent, CardComponent } from 'zt-ui-components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InputComponent, SelectComponent, TextareaComponent, CardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('test-app');
}
