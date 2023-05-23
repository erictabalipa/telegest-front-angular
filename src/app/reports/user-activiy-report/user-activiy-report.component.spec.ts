import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActiviyReportComponent } from './user-activiy-report.component';

describe('UserActiviyReportComponent', () => {
  let component: UserActiviyReportComponent;
  let fixture: ComponentFixture<UserActiviyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActiviyReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserActiviyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
