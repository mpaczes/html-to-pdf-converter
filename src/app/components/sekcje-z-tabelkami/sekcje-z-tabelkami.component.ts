import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Sekcja {
  naglowek: string,
  wiersze: Wiersz[]
}

export interface Wiersz {
  nazwa: string,
  kategoria: string,
  cenaZaSztuke: number,
  ilosc: number,
  cena: number
}

@Component({
    selector: 'docs-conv-sekcje-z-tabelkami',
    imports: [CommonModule, FormsModule],
    templateUrl: './sekcje-z-tabelkami.component.html',
    styleUrls: ['./sekcje-z-tabelkami.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SekcjeZTabelkamiComponent {

  // sekcjeZTabelkami: Sekcja[] = [
  //   {
  //     naglowek: 'Piłka nożna',
  //     wiersze: [
  //       { nazwa: 'Piłka, rozmiar 5', kategoria: 'Sprzęt', cenaZaSztuke: 99.99, ilosc: 4, cena: 399.96 },
  //       { nazwa: 'Koszulka piłkarska, L', kategoria: 'Odzież', cenaZaSztuke: 55.49, ilosc: 10, cena: 554.90 },
  //     ]
  //   }
  // ];
  sekcjeZTabelkami: Sekcja[] = [];

  naglowek: string = '';
  kategorie: string[] = ['Sprzęt', 'Odzież', 'Akcesoria'];

  @Output()
  sekcjeZTabelkamiEventEmitter = new EventEmitter<{ zdarzenie: 'dodaj' | 'usun' | 'edycja', typ: 'sekcja' | 'wiersz', wiersz: Wiersz, naglowekSekcji: string }>();

  dodajSekcje() {
    const pustyWiersz = { nazwa: '', kategoria: '', cenaZaSztuke: 0, ilosc: 0, cena: 0 };
    this.sekcjeZTabelkami.push({
      naglowek: this.naglowek,
      wiersze: [pustyWiersz]
    });
    this.sekcjeZTabelkamiEventEmitter.emit({ zdarzenie: 'dodaj', typ: 'sekcja', wiersz: pustyWiersz, naglowekSekcji: this.naglowek });
  }

  dodajWiersz(sekcjaNaglowek: string) {
    const pustyWiersz = { nazwa: '', kategoria: '', cenaZaSztuke: 0, ilosc: 0, cena: 0 };
    this.sekcjeZTabelkami.find(sekcja => sekcja.naglowek === sekcjaNaglowek)?.wiersze.push(pustyWiersz);
    this.sekcjeZTabelkamiEventEmitter.emit({ zdarzenie: 'dodaj', typ: 'wiersz', wiersz: pustyWiersz, naglowekSekcji: sekcjaNaglowek });
  }

  usunWiersz(sekcjaNaglowek: string, wiersz: Wiersz) {
    this.sekcjeZTabelkami.find(sekcja => sekcja.naglowek === sekcjaNaglowek)?.wiersze.splice(
      this.sekcjeZTabelkami.find(sekcja => sekcja.naglowek === sekcjaNaglowek)?.wiersze.indexOf(wiersz) ?? 0, 1
    );
    this.sekcjeZTabelkamiEventEmitter.emit({ zdarzenie: 'usun', typ: 'wiersz', wiersz: wiersz, naglowekSekcji: sekcjaNaglowek });
  }

  edytujWiersz(sekcjaNaglowek: string, wiersz: Wiersz) {
    if (wiersz.cenaZaSztuke && wiersz.ilosc) {
      wiersz.cena = wiersz.cenaZaSztuke * wiersz.ilosc;
    }

    if (wiersz.nazwa && wiersz.kategoria && wiersz.cenaZaSztuke && wiersz.ilosc) {
      this.sekcjeZTabelkamiEventEmitter.emit({ zdarzenie: 'edycja', typ: 'wiersz', wiersz: wiersz, naglowekSekcji: sekcjaNaglowek });
    }
  }

  obliczSumeZakupow(wierszeSekcji: Wiersz[]): number {
    let suma = 0;

    if (wierszeSekcji) {
        wierszeSekcji.forEach(wiersz => {
        suma += wiersz.cena;
      });
    }

    return suma;
  }

}
