import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {
  constructor() {}

  categories = [
    { id: 'top', label: 'Top Games' },
    { id: 'new', label: 'New Games' },
    { id: 'slots', label: 'Slots' },
    { id: 'jackpots', label: 'Jackpots' },
    { id: 'live', label: 'Live' },
    { id: 'blackjack', label: 'Blackjack' },
    { id: 'roulette', label: 'Roulette' },
    { id: 'table', label: 'Table' },
    { id: 'poker', label: 'Poker' },
    { id: 'other', label: 'Other' },
  ];

  activeCategory = 'top';

  selectCategory(categoryId: string) {
    // TODO
  }
}
