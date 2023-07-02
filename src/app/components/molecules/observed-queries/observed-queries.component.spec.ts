import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservedQueriesComponent } from './observed-queries.component';

describe('ObservedQueriesComponent', () => {
  let component: ObservedQueriesComponent;
  let fixture: ComponentFixture<ObservedQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservedQueriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservedQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
