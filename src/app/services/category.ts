import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // default category 'top'
  private selectedCategorySource = new BehaviorSubject<string>('top');

  selectedCategory$ = this.selectedCategorySource.asObservable();

  setCategory(category: string) {
    this.selectedCategorySource.next(category);
  }
}
