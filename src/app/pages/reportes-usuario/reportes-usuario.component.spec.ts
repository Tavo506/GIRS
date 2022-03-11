import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesUsuarioComponent } from './reportes-usuario.component';

describe('ReportesUsuarioComponent', () => {
  let component: ReportesUsuarioComponent;
  let fixture: ComponentFixture<ReportesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
