import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedEverythingComonent } from './embed-evertything.component';

describe('EmbedEverythingComonent', () => {
  let component: EmbedEverythingComonent;
  let fixture: ComponentFixture<EmbedEverythingComonent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbedEverythingComonent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedEverythingComonent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
