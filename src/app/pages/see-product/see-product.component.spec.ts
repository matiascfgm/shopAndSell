import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeProductComponent } from './see-product.component';

describe('SeeProductComponent', () => {
  let component: SeeProductComponent;
  let fixture: ComponentFixture<SeeProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
