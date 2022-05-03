import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoPlotComponent } from './grafico-plot.component';

describe('GraficoPlotComponent', () => {
  let component: GraficoPlotComponent;
  let fixture: ComponentFixture<GraficoPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
