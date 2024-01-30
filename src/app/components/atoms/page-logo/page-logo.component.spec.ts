import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLogoComponent } from './page-logo.component';

describe('PageLogoComponent', () => {
  let component: PageLogoComponent;
  let fixture: ComponentFixture<PageLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageLogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
