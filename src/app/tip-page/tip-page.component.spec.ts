import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipPageComponent } from './tip-page.component';

describe('TipPageComponent', () => {
  let component: TipPageComponent;
  let fixture: ComponentFixture<TipPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
