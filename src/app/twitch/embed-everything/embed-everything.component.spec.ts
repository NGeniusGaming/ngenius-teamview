import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedEverythingComponent } from './embed-evertything.component';

describe('EmbedEverythingComponent', () => {
  let component: EmbedEverythingComponent;
  let fixture: ComponentFixture<EmbedEverythingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbedEverythingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedEverythingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
