import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListitemComponent } from './listitem.component';

describe('ListitemComponent', () => {
  let component: ListitemComponent;
  let fixture: ComponentFixture<ListitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
