import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhdThesisListComponent } from './phd-thesis-list.component';

describe('PhdThesisListComponent', () => {
  let component: PhdThesisListComponent;
  let fixture: ComponentFixture<PhdThesisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhdThesisListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhdThesisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
