import { CategoryService } from './category';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    service = new CategoryService();
  });

  it('should default to top category', (done) => {
    service.selectedCategory$.subscribe((category) => {
      expect(category).toBe('top');
      done();
    });
  });

  it('should update category', (done) => {
    service.setCategory('new');

    service.selectedCategory$.subscribe((category) => {
      expect(category).toBe('new');
      done();
    });
  });
});
