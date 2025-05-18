import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'docs-conv-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'docs-converter-from-html-to-pdf';
}
