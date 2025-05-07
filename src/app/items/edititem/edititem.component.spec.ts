import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdititemComponent } from './edititem.component';

describe('EdititemComponent', () => {
  let component: EdititemComponent;
  let fixture: ComponentFixture<EdititemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdititemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdititemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
