import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game, GamesService } from '../../services/games';
import { CategoryService } from '../../services/category';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games.html',
  styleUrls: ['./games.css']
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];

  constructor(
    private gameService: GamesService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    // Load games from API
    this.gameService.getGames().subscribe(data => {
      this.games = data;

      // Initial filter using default category ("top")
      this.categoryService.selectedCategory$.subscribe(category => {
        this.filterGames(category);
      });
    });
  }

  filterGames(category: string) {
    if (category === 'other') {
      this.filteredGames = this.games.filter(game =>
        game.categories.some(cat =>
          ['other', 'ball', 'virtual', 'fun'].includes(cat)
        )
      );
    } else {
      this.filteredGames = this.games.filter(game =>
        game.categories.includes(category)
      );
    }
  }
}
