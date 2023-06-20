import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MscThesisListComponent } from './msc-thesis-list.component';

describe('MscThesisListComponent', () => {
  let component: MscThesisListComponent;
  let fixture: ComponentFixture<MscThesisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MscThesisListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MscThesisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
