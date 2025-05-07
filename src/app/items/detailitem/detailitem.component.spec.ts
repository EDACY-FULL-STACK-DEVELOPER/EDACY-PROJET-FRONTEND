import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailitemComponent } from './detailitem.component';

describe('DetailitemComponent', () => {
  let component: DetailitemComponent;
  let fixture: ComponentFixture<DetailitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
