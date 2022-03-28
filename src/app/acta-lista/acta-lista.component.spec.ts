import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActaListaComponent } from './acta-lista.component';

describe('ActaListaComponent', () => {
  let component: ActaListaComponent;
  let fixture: ComponentFixture<ActaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActaListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
