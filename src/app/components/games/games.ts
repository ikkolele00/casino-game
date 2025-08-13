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
  currentCategory: string = 'top'; // default

  constructor(
    private gameService: GamesService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.gameService.getGames().subscribe(data => {
      this.games = data;

      this.categoryService.selectedCategory$.subscribe(category => {
        this.currentCategory = category;
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
