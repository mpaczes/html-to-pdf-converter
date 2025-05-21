import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresaciComponent } from './adresaci.component';

describe('AdresaciComponent', () => {
  let component: AdresaciComponent;
  let fixture: ComponentFixture<AdresaciComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdresaciComponent]
    });
    fixture = TestBed.createComponent(AdresaciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
