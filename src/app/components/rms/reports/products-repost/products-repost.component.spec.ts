import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsRepostComponent } from './products-repost.component';

describe('ProductsRepostComponent', () => {
  let component: ProductsRepostComponent;
  let fixture: ComponentFixture<ProductsRepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsRepostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsRepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
