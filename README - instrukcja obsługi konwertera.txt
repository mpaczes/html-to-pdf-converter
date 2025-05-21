
Jak używać weasyprint na Windows ?
	
(1) Do poprawnego działania potrzebne są :

	(1.1) ściągnąć na komputer z Windowsem plik weasyprint-windows.zip :
	
		Windows -> To use WeasyPrint on Windows, the easiest way is to use the executable of the latest release :
	
			https://github.com/Kozea/WeasyPrint/releases
		
		na przykład ostatnia wersja to -> https://github.com/Kozea/WeasyPrint/releases/tag/v65.1
		
	(1.2) rozpakować ten plik weasyprint-windows.zip do bieżącego katalogu
	
	(1.3) plik wejściowy z HTML nazywa się 'startowy-plik-z-css.html', a plik ze stylami CSS, to 'style-css.css'
	
		weasyprint w locie tworzy plik wynikowy 'wyjsciowy-plik.pdf'

(2) Z linii komend w tym katalogu napisz :

	weasyprint-windows\dist\weasyprint -s style-css.css startowy-plik-z-css.html C:\Users\hp\Downloads\konwersja_html_to_pdf\wyjsciowy-plik.pdf

(3) Angular -> utworzenie projektu 'docs-converter-from-html-to-pdf' :

	(3.1) utworzenie projektu 'new docs-converter-from-html-to-pdf' :
	
		ng new docs-converter-from-html-to-pdf --style css --prefix docs-conv --routing false --standalone true --view-encapsulation None
	
	(3.2) instalacja dodatkowych bibliotek Angulara :
	
		ng add @angular/material
	
		..
		
