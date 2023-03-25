import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsRouteComponent } from './boards-route.component';

describe('BoardsRouteComponent', () => {
  let component: BoardsRouteComponent;
  let fixture: ComponentFixture<BoardsRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardsRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
