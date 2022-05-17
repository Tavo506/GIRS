import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalidadesComponent } from './municipalidades.component';

describe('CalculadoraComponent', () => {
  let component: MunicipalidadesComponent;
  let fixture: ComponentFixture<MunicipalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipalidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
