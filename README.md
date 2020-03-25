# Web Application Engineering & Content Management
- Master: ![master](https://github.com/schoenenberg/waecm-group-09/workflows/CI/badge.svg?branch=master) 
- Develop: ![develop](https://github.com/schoenenberg/waecm-group-09/workflows/CI/badge.svg?branch=develop)

## Gruppenteilnehmer
Maximilian Schönenberg, Sigrid Huemer 51824175, Alicia Schwabenbauer 11925878, Elena Nuiding 11925876 ---!!! alle Matrikelnummern ergänzen

## Technologieauswahl

### Frontend
Bei der Frontend Entwicklung wird React mit TypeScript verwendet. React ist vor allem schnell und gut skalierbar. Zudem weist React einen großen Marktanteil auf und ist aus diesem Grund eine Technologie, mit welcher sich Entwickler beschäftigen sollten. TypeScript wiederum hat eine starke Typisierung und verringert somit die Anzahl der Laufzeitfehler. Für das Styling wird Material Ui verwendet. Es bietet eine breite Auswahl an vordefinierten Styles und eine gute Dokumentation.

### Backend
- Backend: Node.js

### Kommunikation
- Kommunikation: GraphQL (Tokenverifikation) ?
Für die Kommunikation wurde GraphQL verwendet, da es sowohl flexibler als auch effizienter als REST ist. Zudem löst es das Problem, dass oft entweder zu viele oder zu wenige Daten abgerufen werden und ist somit ein aufsteigendes API-Konzept.

Die Datenbank wird erst im zweiten Beispiel ausgewählt werden (vermutlich MongoDB/ Postgres ->kommt darauf an, welche Art von Daten gespeichert werden sollen).

## Linter Aufruf
Beschreibung ergänzen------!!!!

## Containerisierung
Die Applikation kann mittles docker-compose up gestartet werden.

Das Backend nutzt node:10-alpine als builder und läuft auf Port 8080. Dabei wird TCP als Protocol verwendet.

Das Frontend wird in zwei Stages(build und run) aufgeteilt. 
Zunächst wird das Frontend mit node:12.2.0-alpine als builder gebaut, und läuft anschließend mit nginx:1.17.9 als Image. Durch eine nginx Config wird der Port auf 3000 gesetzt und das Frontend kann über localhost:3000 erreicht werden.
 


