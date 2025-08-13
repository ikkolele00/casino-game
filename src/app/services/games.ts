import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export interface Game {
  categories: string[];
  name: string;
  image: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private gamesUrl = 'http://stage.whgstage.com/front-end-test/games.php';
  private jackpotsUrl = 'http://stage.whgstage.com/front-end-test/jackpots.php';

  constructor(private http: HttpClient) {}

  getGames(): Observable<any> {
    return this.http.get<any>(this.gamesUrl);
  }

  getJackpots(): Observable<any> {
    return this.http.get<any>(this.jackpotsUrl);
  }
}
