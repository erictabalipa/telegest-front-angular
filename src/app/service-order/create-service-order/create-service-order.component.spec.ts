import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceOrderComponent } from './create-service-order.component';

describe('CreateServiceOrderComponent', () => {
  let component: CreateServiceOrderComponent;
  let fixture: ComponentFixture<CreateServiceOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
