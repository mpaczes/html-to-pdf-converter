import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Adresat {
  imie?: string;
  nazwisko?: string;
  ulica?: string;
  kodPocztowy?: string;
  miasto?: string;
}

@Component({
    selector: 'docs-conv-adresaci',
    imports: [CommonModule, FormsModule],
    templateUrl: './adresaci.component.html',
    styleUrls: ['./adresaci.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdresaciComponent {

  adresaci: Adresat[] = [
    { imie: 'Jan', nazwisko: 'Kowalski', ulica: 'Bagienna 32', kodPocztowy:'00-001', miasto: 'Bździszewo' },
    { imie: 'Eugenia', nazwisko: 'Iksińska', ulica: 'Wesoła 12a/6', kodPocztowy:'12-345', miasto: 'Smutkowo' },
  ]
  wybraniAdresaci: Adresat[] = []
  wybranyAdresat: Adresat = {}
  @Output()
  adresatEventEmitter = new EventEmitter<{ czynnosc: string, adresat: Adresat }>();

  dodajAdresata() {
    this.wybraniAdresaci.push(this.wybranyAdresat);
    this.adresatEventEmitter.emit({ czynnosc: 'dodaj', adresat: this.wybranyAdresat });
  }

  usunAdresata() {
    this.wybraniAdresaci = this.wybraniAdresaci.filter(adresat => adresat !== this.wybranyAdresat);
    this.adresatEventEmitter.emit({ czynnosc: 'usun', adresat: this.wybranyAdresat });
  }

}
