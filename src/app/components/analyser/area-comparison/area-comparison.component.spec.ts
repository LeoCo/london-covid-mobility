import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaComparisonComponent } from './area-comparison.component';

describe('AreaComparisonComponent', () => {
  let component: AreaComparisonComponent;
  let fixture: ComponentFixture<AreaComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
