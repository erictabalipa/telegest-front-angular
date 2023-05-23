import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLampComponent } from './create-lamp.component';

describe('CreateLampComponent', () => {
  let component: CreateLampComponent;
  let fixture: ComponentFixture<CreateLampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLampComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
