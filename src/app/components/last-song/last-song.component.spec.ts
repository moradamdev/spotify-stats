import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSongComponent } from './last-song.component';

describe('LastSongComponent', () => {
  let component: LastSongComponent;
  let fixture: ComponentFixture<LastSongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LastSongComponent]
    });
    fixture = TestBed.createComponent(LastSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
