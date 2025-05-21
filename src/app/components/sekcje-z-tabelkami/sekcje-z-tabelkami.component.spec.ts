import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SekcjeZTabelkamiComponent } from './sekcje-z-tabelkami.component';

describe('SekcjeZTabelkamiComponent', () => {
  let component: SekcjeZTabelkamiComponent;
  let fixture: ComponentFixture<SekcjeZTabelkamiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SekcjeZTabelkamiComponent]
    });
    fixture = TestBed.createComponent(SekcjeZTabelkamiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
