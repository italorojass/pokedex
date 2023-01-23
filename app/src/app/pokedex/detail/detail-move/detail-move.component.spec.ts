import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMoveComponent } from './detail-move.component';

describe('DetailMoveComponent', () => {
  let component: DetailMoveComponent;
  let fixture: ComponentFixture<DetailMoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
