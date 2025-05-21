import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';

import { NgxEditorModule } from 'ngx-editor';
import { Editor } from 'ngx-editor';
import { AdresaciComponent, Adresat } from "./components/adresaci/adresaci.component";
import { Sekcja, SekcjeZTabelkamiComponent, Wiersz } from "./components/sekcje-z-tabelkami/sekcje-z-tabelkami.component";

@Component({
  selector: 'docs-conv-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    NgxEditorModule,
    AdresaciComponent,
    SekcjeZTabelkamiComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {

  nadawca: string = `Super Produkty Sportowe Sp. z o.o.`;
  podpisNadawcy = {
    nazwa: 'Zbigniew Tenis-Ziemny',
    stanowisko: 'ekspert ds. sprzedaży',
    telefon: 'tel. 123-456-789',
    email: 'mail: zbigniew.tenis-ziemny@superproduktysportowe.pl',
    stopka: 'Super Produkty Sportowe Sp. z o.o.'
  };
  miejscowoscData: string = `Warszawa, 2024-02-29`;
  tytulPisma: string = `Zestawienie produktów sportowych`;
  trescPisma: string = `
    <p>Przesyłam zestawienie produktów, które można nabyć z naszej hurtowni. W
    przypadku zainteresowania którymś z produktów, proszę o kontakt telefonicznie na numer
    <strong>123-456-789</strong> lub mailowo - <strong>zbigniew.tenisziemny@superproduktysportowe.pl</strong></p>
  `;
  editor!: Editor;
  sekcjaAdresaci: Adresat[] = [];
  sekcjaZTabelkami: Sekcja[] = [];

  constructor() {}

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  obslugaAdresata(adresatEventEmitter: { czynnosc: string, adresat: Adresat }) {
    if (adresatEventEmitter.czynnosc === 'dodaj') {
      this.sekcjaAdresaci.push(adresatEventEmitter.adresat);
    }
    else if (adresatEventEmitter.czynnosc === 'usun') {
      this.sekcjaAdresaci.splice(this.sekcjaAdresaci.indexOf(adresatEventEmitter.adresat), 1);
    }
    this.printToConsole();
  }

  wydrukujSekcjeAdresatow(): string {
    let wyjsciowyHtml: string = '';

    this.sekcjaAdresaci.forEach(adresat => wyjsciowyHtml += `<p>${adresat.imie} ${adresat.nazwisko}, ${adresat.ulica}, ${adresat.kodPocztowy} ${adresat.miasto}</p>`);

    return wyjsciowyHtml;
  }

  obslugaSekcjiZTabelkami(sekcjaZTabelkamiEventEmitter: { zdarzenie: string, typ: string, wiersz: Wiersz, naglowekSekcji: string }) {
    if (sekcjaZTabelkamiEventEmitter.zdarzenie === 'dodaj' && sekcjaZTabelkamiEventEmitter.typ === 'sekcja') {
      this.sekcjaZTabelkami.push({ naglowek: sekcjaZTabelkamiEventEmitter.naglowekSekcji, wiersze: [sekcjaZTabelkamiEventEmitter.wiersz] });
    } else if (sekcjaZTabelkamiEventEmitter.zdarzenie === 'dodaj' && sekcjaZTabelkamiEventEmitter.typ === 'wiersz') {
      this.sekcjaZTabelkami.find(sekcja => sekcja.naglowek === sekcjaZTabelkamiEventEmitter.naglowekSekcji)?.wiersze.push(sekcjaZTabelkamiEventEmitter.wiersz);
    } else if (sekcjaZTabelkamiEventEmitter.zdarzenie === 'usun' && sekcjaZTabelkamiEventEmitter.typ === 'wiersz') {
      this.sekcjaZTabelkami.find(sekcja => sekcja.naglowek === sekcjaZTabelkamiEventEmitter.naglowekSekcji)?.wiersze.splice(
        this.sekcjaZTabelkami.find(sekcja => sekcja.naglowek === sekcjaZTabelkamiEventEmitter.naglowekSekcji)?.wiersze.indexOf(sekcjaZTabelkamiEventEmitter.wiersz) ?? 0, 1
      );
    } else if (sekcjaZTabelkamiEventEmitter.zdarzenie === 'edycja' && sekcjaZTabelkamiEventEmitter.typ === 'wiersz') {
      this.sekcjaZTabelkami.find(sekcja => sekcja.naglowek === sekcjaZTabelkamiEventEmitter.naglowekSekcji)?.wiersze.splice(
        this.sekcjaZTabelkami.find(sekcja => sekcja.naglowek === sekcjaZTabelkamiEventEmitter.naglowekSekcji)?.wiersze.indexOf(sekcjaZTabelkamiEventEmitter.wiersz) ?? 0, 1,
        sekcjaZTabelkamiEventEmitter.wiersz
      );
    }
    this.printToConsole();
  }

  wydrukujSekcjeZTabelkami(): string {
    let wyjsciowyHtml: string = '';

    this.sekcjaZTabelkami.forEach(sekcja => {
      wyjsciowyHtml += `<table>
        <caption>${sekcja.naglowek}</caption>
        <thead><tr>
          <th>Nazwa</th><th>Kategoria</th><th>Cena za sztukę</th><th>Ilość</th><th>Cena</th>
        </tr></thead><tbody>`;

        sekcja.wiersze.forEach((wiersz, indeks, wiersze) => {
          wyjsciowyHtml += `
            <tr>
              <td>${wiersz.nazwa}</td>
              <td>${wiersz.kategoria}</td>
              <td>${wiersz.cenaZaSztuke.toFixed(2)}</td>
              <td>${wiersz.ilosc}</td>
              <td>${wiersz.cena.toFixed(2)}</td>
            </tr>
          `;
          if (indeks === wiersze.length - 1) {
            wyjsciowyHtml += `</tbody><tfoot>Suma zakupów : 12.50</tfoot></table>`;
          }
        });
    });

    return wyjsciowyHtml;
  }

  printToConsole() {
    console.clear();
    console.info(`<div class="nadawca"><p>${this.nadawca}</p></div>`);
    console.info(`<div class="miejscowosc-data"><p>${this.miejscowoscData}</p></div>`);
    console.info(`<div class="adresaci">${this.wydrukujSekcjeAdresatow()}</div>`);
    console.info(`<div class="tytul-pisma"><p>${this.tytulPisma}</p></div>`);
    console.info(`<div class="tresc-pisma"><p>${this.trescPisma}</p></div>`);
    console.info(`<div class="sekcja-z-tabelkami">${this.wydrukujSekcjeZTabelkami()}</div>`);
    console.info(`<div class="podpis-nadawcy">
      <p>${this.podpisNadawcy.nazwa}</p>
      <p>${this.podpisNadawcy.stanowisko}</p>
      <p>${this.podpisNadawcy.telefon}</p>
      <p>${this.podpisNadawcy.email}</p>
      <p>${this.podpisNadawcy.stopka}</p>
    </div>`);
  }

}
