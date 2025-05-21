
Jak używać konwertera na Windows ?
	
(1) Do poprawnego działania potrzebne są :

	(1.1) 
		ściągnąć na komputer z Windowsem plik weasyprint-windows.zip :
	
			https://github.com/Kozea/WeasyPrint/releases
		
		na przykład ostatnia wersja to -> https://github.com/Kozea/WeasyPrint/releases/tag/v65.1
		
	(1.2) 
		rozpakować ten plik weasyprint-windows.zip do bieżącego katalogu
	
	(1.3) 
		plik wejściowy konwertera z HTML nazywa się 'startowy-plik-z-css.html', a plik ze stylami CSS, to 'style-css.css'
	
		weasyprint w locie tworzy plik wynikowy 'wyjsciowy-plik.pdf'
		
		użytownik modyfikuje tylko plik 'startowy-plik-z-css.html' poprzez skopiowanie zawartości konsoli przeglądarki internetowej
		
	(1.4)
		ściągnąc aplikację Angulara -> git clone https://github.com/mpaczes/html-to-pdf-converter.git
	
		uruchomić aplikację Angulara -> npm run start
		
		otworzyć okno przeglądarki i wpisać adres -> localhost:4200
		
		utworzyć na stronie internetowej dokument do konwersji i otworzyć konsolę przeglądarki internetowej
		
		skopiować zawartość konsoli pzreglądarki do pliku 'startowy-plik-z-css.html'

(2) 
	Z linii komend w tym katalogu napisz :

	weasyprint-windows\dist\weasyprint -s style-css.css -e utf-8 startowy-plik-z-css.html <SCIEZKA_DO_PLIKU>\wyjsciowy-plik.pdf
