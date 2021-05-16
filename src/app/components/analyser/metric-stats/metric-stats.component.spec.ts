import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricStatsComponent } from './metric-stats.component';

describe('MetricStatsComponent', () => {
  let component: MetricStatsComponent;
  let fixture: ComponentFixture<MetricStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
