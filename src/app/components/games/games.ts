import { Jackpot } from './../../services/games';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Game, GamesService } from '../../services/games';
import { CategoryService } from '../../services/category';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

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
  jackpots: { game: string; amount: number }[] = [];
  jackpotsMap: Record<string, number> = {};

  constructor(
    private cd: ChangeDetectorRef,
    private gameService: GamesService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    // load games
    this.gameService.getGames().subscribe(games => {
      this.games = games;

      // watch category changes
      this.categoryService.selectedCategory$.subscribe(category => {
        this.currentCategory = category;
        this.filterGames();
      });

      // start jackpot polling after games are loaded
      interval(5000)
        .pipe(
          startWith(0), // fetch immediately
          switchMap(() => this.gameService.getJackpots())
        )
        .subscribe((jackpots: Jackpot[]) => {
          this.jackpotsMap = {};
          jackpots.forEach(j => (this.jackpotsMap[j.game] = j.amount));
          this.cd.detectChanges();
        });
    });
  }

  filterGames() {
    if (this.currentCategory === 'other') {
      this.filteredGames = this.games.filter(game =>
        game.categories.some(cat =>
          ['other', 'ball', 'virtual', 'fun'].includes(cat)
        )
      );
    } else {
      this.filteredGames = this.games.filter(game =>
        game.categories.includes(this.currentCategory)
      );
    }
  }
}
