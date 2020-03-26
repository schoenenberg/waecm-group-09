# Web Application Engineering & Content Management
- Master: ![master](https://github.com/schoenenberg/waecm-group-09/workflows/CI/badge.svg?branch=master) 
- Develop: ![develop](https://github.com/schoenenberg/waecm-group-09/workflows/CI/badge.svg?branch=develop)

## Gruppenteilnehmer
Maximilian Schönenberg 11931241, Sigrid Huemer 51824175, Alicia Schwabenbauer 11925878, Elena Nuiding 11925876

## Technologieauswahl

### Frontend
Bei der Frontend Entwicklung wird React mit TypeScript verwendet. React ist vor allem schnell und gut skalierbar. Zudem weist React einen großen Marktanteil auf und ist aus diesem Grund eine Technologie, mit welcher sich Entwickler beschäftigen sollten. TypeScript wiederum hat eine starke Typisierung und verringert somit die Anzahl der Laufzeitfehler. Für das Styling wird Material UI, ein React UI Framework, welches sich an [Material Design](https://material.io) orientiert, verwendet. Es bietet eine breite Auswahl an vordefinierten Styles und Komponenten, sowie eine gute Dokumentation.

### Backend
- Backend: Node.js

### Kommunikation
- Kommunikation: GraphQL (Tokenverifikation) ?
Für die Kommunikation wurde GraphQL verwendet, da es sowohl flexibler als auch effizienter als REST ist. Im Gegensatz zu REST reicht bei einer GraphQL-API eine einzige Anfrage an den Server aus, um alle relevanten Daten zu erhalten. Dadurch löst GraphQL das Problem, dass oft entweder zu viele oder zu wenige Daten abgerufen werden und ist somit ein aufsteigendes API-Konzept.

Die Datenbank wird erst im zweiten Beispiel ausgewählt werden (vermutlich MongoDB/ Postgres ->kommt darauf an, welche Art von Daten gespeichert werden sollen).

## Linter Aufruf
Beschreibung ergänzen------!!!!

## Containerisierung
Die Applikation kann mittles `docker-compose -f docker-compose-a1.yaml up` gestartet werden. Das Frontend ist auf [localhost:3000](http://localhost:3000) erreichbar.

Um die Docker-Images von Source zu bauen und zu starten, kann dies einfach mit `docker-compose up --build` erreicht werden.

Das Backend nutzt node:10-alpine als Basis-Image, kompiliert dieses und stellt dieses als "Production"-Build auf Port 8080 bereit.

Das Frontend wird mit einem Docker-Multi-Stage Build kompiliert und in ein nginx-Image installiert. Durch eine nginx-Config wird der Port auf 3000 gesetzt und das Frontend kann über localhost:3000 erreicht werden.
