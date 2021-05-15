import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotByMetricComponent } from './plot-by-metric.component';

describe('PlotByMetricComponent', () => {
  let component: PlotByMetricComponent;
  let fixture: ComponentFixture<PlotByMetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotByMetricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotByMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
