import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LampReportComponent } from './lamp-report.component';

describe('LampReportComponent', () => {
  let component: LampReportComponent;
  let fixture: ComponentFixture<LampReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LampReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LampReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
