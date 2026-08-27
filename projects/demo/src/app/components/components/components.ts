import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { componentCatalog } from '../../nav';

@Component({
  selector: 'rng-doc-components',
  imports: [RouterLink],
  templateUrl: './components.html',
  styleUrl: './components.scss',
})
export class Components {
  protected readonly components = componentCatalog;
}
