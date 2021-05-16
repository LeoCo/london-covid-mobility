import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOfWeekHeatmapComponent } from './day-of-week-heatmap.component';

describe('DayOfWeekHeatmapComponent', () => {
  let component: DayOfWeekHeatmapComponent;
  let fixture: ComponentFixture<DayOfWeekHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayOfWeekHeatmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayOfWeekHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
