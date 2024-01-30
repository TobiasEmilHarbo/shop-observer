import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyStateSearchComponent } from './empty-state-search.component';

describe('EmptyStateSearchComponent', () => {
  let component: EmptyStateSearchComponent;
  let fixture: ComponentFixture<EmptyStateSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyStateSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyStateSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
