# Web Application Engineering & Content Management
- Master: ![master](https://github.com/schoenenberg/waecm-group-09/workflows/CI/badge.svg?branch=master) 
- Develop: ![develop](https://github.com/schoenenberg/waecm-group-09/workflows/CI/badge.svg?branch=develop)

## Gruppenteilnehmer
Maximilian Schönenberg 11931241, Sigrid Huemer 51824175, Alicia Schwabenbauer 11925878, Elena Nuiding 11925876

## Technologieauswahl

### Frontend
Bei der Frontend Entwicklung wird **React mit TypeScript** verwendet. React ist vor allem schnell und gut skalierbar. Zudem weist React einen großen Marktanteil auf und ist aus diesem Grund eine Technologie, mit welcher sich Entwickler beschäftigen sollten. TypeScript wiederum hat eine starke Typisierung und verringert somit die Anzahl der Laufzeitfehler. Für das Styling wird Material UI, ein React UI Framework, welches sich an [Material Design](https://material.io) orientiert, verwendet. Es bietet eine breite Auswahl an vordefinierten Styles und Komponenten, sowie eine gute Dokumentation.

### Backend
Im Backend verwenden wir das Framework **Nest.js**, da dieses design patterns wie MVC und Decorators in Node.js bringt.  Nest.js hat eine gute Unterstützung für GraphQL APIs und bietet dafür einige interne Libraries. Ein großer Vorteil ist, dass bei der Verwendung von **TypeScript** der "code first approach" in Nest.js genutzt werden kann, um stark typisierte GraphQL schemas zu generieren.

### Kommunikation
Für die Kommunikation wurde **GraphQL** verwendet, da es sowohl flexibler als auch effizienter als REST ist. Im Gegensatz zu REST reicht bei einer GraphQL-API eine einzige Anfrage an den Server aus, um alle relevanten Daten zu erhalten. Dadurch löst GraphQL das Problem, dass oft entweder zu viele oder zu wenige Daten abgerufen werden und ist somit ein aufsteigendes API-Konzept.

Die Datenbank wird erst im zweiten Beispiel ausgewählt werden (vermutlich MongoDB/ Postgres ->kommt darauf an, welche Art von Daten gespeichert werden sollen).

## Linter Aufruf
Der Linter wird im Frontend und im Backend über `npm run lint` aufgerufen.

## Containerisierung
Die Applikation kann mittles `docker-compose -f docker-compose-a1.yaml up` gestartet werden. Das Frontend ist auf [localhost:3000](http://localhost:3000) erreichbar.

Um die Docker-Images von Source zu bauen und zu starten, kann dies einfach mit `docker-compose up --build` erreicht werden.

Das Backend nutzt node:10-alpine als Basis-Image, kompiliert dieses und stellt dieses als "Production"-Build auf Port 8080 bereit.

Das Frontend wird mit einem Docker-Multi-Stage Build kompiliert und in ein nginx-Image installiert. Durch eine nginx-Config wird der Port auf 3000 gesetzt und das Frontend kann über localhost:3000 erreicht werden.



## GraphQL Dokumentation

Die Dokumentation kann unter der Adresse [localhost:8080/graphql]() im Playground aufgerufen werden.



Der **Return Type** von jeder Query und Mutation (die Subreddits betrifft) ist `SubredditModel`:

| Variable           | type     | Description                                                  |
| ------------------ | -------- | ------------------------------------------------------------ |
| _id                | String   | ID which is created by the MongoDB at creation               |
| name               | String   | The name of the subreddit (e.g. reactjs, test). Has a length of 3-20 letters. |
| keywords           | [String] | An array with different keywords with each 2-30 letters. The bot responds to comments with those keywords, if the comment also includes the string 'waecm-2020-group-09'. |
| answer             | String   | The answer, the bot gives when commenting. Has 2-300 letters. |
| active             | Boolean  | Switches the bot off and on                                  |
| description        | String   | The short subtitle of the subreddit (is fetched from Reddit) |
| icon               | String   | The icon of the subreddit (is fetched from Reddit)           |
| answeredCommentIDs | [String] | Saves the IDs of the already answered comments on Reddit.    |
| createdOn          | DateTime | Date, at which the bot was created.                          |

_____________________________________________

#### Queries

**allSubreddits**

Arguments: Keine Arguments - User muss lediglich authentifiziert sein.

Return Type:  `SubredditModel` 



**currentUser**

Arguments: Keine Arguments - User muss lediglich authentifiziert sein.

Return Type:  `UserModel` (in der Tabelle)

| Variable    | Type   |
| ----------- | ------ |
| username    | String |
| picture     | String |
| name        | String |
| nickname    | String |
| family_name | String |
| given_name  | String |



_____________________________________________

#### Mutations

**getSubreddit**

Arguments: `_id: String`

Return Type:  `SubredditModel`



**updateSubreddit**

Type in der Tabelle: *UpdateSubredditInput*

| Variable | Type     | Description (ALL OPTIONAL)                                   |
| -------- | -------- | ------------------------------------------------------------ |
| name     | String   | The name of the subreddit (e.g. reactjs, test). Has a length of 3-20 letters. |
| keywords | [String] | An array with different keywords with each 2-30 letters. The bot responds to comments with those keywords, if the comment also includes the string 'waecm-2020-group-09'. |
| answer   | String   | The answer, the bot gives when commenting. Has 2-300 letters. |
| active   | Boolean  | Switches the bot off and on                                  |

Arguments: `_id: String`, `input: UpdateSubredditInput`

Return Type:  `SubredditModel`




**createNewSubreddit**

Type in der Tabelle: *NewSubredditInput*

| Variable | Type    | Description (ALL REQUIRED)                                   |
| -------- | -------- | ------------------------------------------------------------ |
| name     | String   | The name of the subreddit (e.g. reactjs, test). Has a length of 3-20 letters. |
| keywords | [String] | An array with different keywords with each 2-30 letters. The bot responds to comments with those keywords, if the comment also includes the string 'waecm-2020-group-09'. |
| answer   | String   | The answer, the bot gives when commenting. Has 2-300 letters. |
| active   | Boolean  | Switches the bot off and on                                  |
| createdOn | DateTime | Date, at which the bot was created.                          |

Arguments:  `input: NewSubredditInput`

Return Type:  `SubredditModel`



**deleteSubreddit**

Arguments:  `_id: String`

Return Type:  `SubredditModel`