import { CommonModule } from '@angular/common';
import { GamesComponent } from './components/games/games';
import { HeaderComponent } from './components/header/header';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, GamesComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('casino-game');
}
