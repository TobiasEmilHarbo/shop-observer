import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservedSearchQueryAsideComponent } from './observed-search-query-aside.component';

describe('ObservedSearchQueryAsideComponent', () => {
  let component: ObservedSearchQueryAsideComponent;
  let fixture: ComponentFixture<ObservedSearchQueryAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObservedSearchQueryAsideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObservedSearchQueryAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
