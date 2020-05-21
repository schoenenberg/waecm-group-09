# Web Application Engineering & Content Management
- Master: ![master](https://github.com/schoenenberg/waecm-group-09/workflows/CI/badge.svg?branch=master) 
- Develop: ![develop](https://github.com/schoenenberg/waecm-group-09/workflows/CI/badge.svg?branch=develop)

## Gruppenteilnehmer
| Name                   | Matrikelnummer |
| ---------------------- | -------------- |
| Sigrid Huemer          | 51824175       |
| Elena Nuiding          | 11925876       |
| Maximilian Schönenberg | 11931241       |
| Alicia Schwabenbauer   | 11925878       |

## Technologieauswahl

### Frontend
Bei der Frontend Entwicklung wird **React mit TypeScript** verwendet. React ist vor allem schnell und gut skalierbar. Zudem weist React einen großen Marktanteil auf und ist aus diesem Grund eine Technologie, mit welcher sich Entwickler beschäftigen sollten. TypeScript wiederum hat eine starke Typisierung und verringert somit die Anzahl der Laufzeitfehler. Für das Styling wird Material UI, ein React UI Framework, welches sich an [Material Design](https://material.io) orientiert, verwendet. Es bietet eine breite Auswahl an vordefinierten Styles und Komponenten, sowie eine gute Dokumentation.

### Backend
Im Backend verwenden wir das Framework **Nest.js**, da dieses design patterns wie MVC und Decorators in Node.js bringt.  Nest.js hat eine gute Unterstützung für GraphQL APIs und bietet dafür einige interne Libraries. Ein großer Vorteil ist, dass bei der Verwendung von **TypeScript** der "code first approach" in Nest.js genutzt werden kann, um stark typisierte GraphQL schemas zu generieren.

### Kommunikation
Für die Kommunikation wurde **GraphQL** verwendet, da es sowohl flexibler als auch effizienter als REST ist. Im Gegensatz zu REST reicht bei einer GraphQL-API eine einzige Anfrage an den Server aus, um alle relevanten Daten zu erhalten. Dadurch löst GraphQL das Problem, dass oft entweder zu viele oder zu wenige Daten abgerufen werden und ist somit ein aufsteigendes API-Konzept.

### Datenbank
Bei der Datenbank wurde **MongoDB** ausgewählt, da ein guter Library-Support für die ausgewählte Backend-Technologie besteht, sowie die Daten - Konfigurationen von Subreddits - gut als Dokument gespeichert und durchsucht werden können.

## Linter Aufruf
Der Linter wird im Frontend und im Backend über `npm run lint` aufgerufen.

## Containerisierung

> **Wichtig: Vor dem ersten Starten die Umgebungsvariablen setzen !**

Die Applikation kann mittels `docker-compose -f docker-compose-a2.yaml up` gestartet werden. Das Frontend ist auf [localhost:3000](http://localhost:3000) erreichbar.

Um die Docker-Images von Source zu bauen und zu starten, kann dies einfach mit `docker-compose up --build` erreicht werden.

In dieser Aufgabe ist zum Deployment die Datenbank `MongoDB` hinzugekommen. Diese wird beim Starten des Docker-Compose mit gestartet. Nur das Backend kann diese erreichen, da Backend und Datenbank zusammen ein Docker-Netzwerk bilden. Damit die Datenbank persistent ist, wird ein Docker-Volume gemountet.

Das Backend nutzt `node:12.2-alpine` als Basis-Image, kompiliert dieses zu einem *Production*-Build und stellt dieses daraufhin in einem neuen Image `node:12.2-alpine` auf Port 8080 bereit. Für diesen Build wird ein Multi-Stage-Build verwendet, um die Kompilierungszeit (durch Layer-Caching) zu reduzieren, und dennoch ein minimales Build-Image zu erhalten.

Das Frontend wird ebenfalls mit einem Multi-Stage-Build kompiliert und in ein `nginx:1.17.9`-Image installiert. Mit diesem Build werden ebenso die Ziele verfolgt die Kompilierungszeit (durch Layer-Chaching) möglichst gering zu halten, möglichst wenige Layer im Result-Image zu haben, sowie nicht den Quellcode, sondern nur die kompilierten und gebundelten Dateien im Result-Image zu installieren. 

## Continuous Integration (CI)

Für die Continuous Integration wird in diesem Projekt *Github Actions* verwendet. Diese kompilieren automatisiert jeden Git-Push (sollten mehrere Commits auf einmal gepushed werden, wird nur der letzte gebaut). Diese kompiliert das Frontend und das Backend mithilfe von Docker und pushed daraufhin die gebauten Docker-Images auf die *Github Packages - Docker*-Registry.

## Konfiguration
Die Konfiguration des Backends wird über Environment-Variablen, die in der *Docker-Compose*-Datei eingetragen werden konfiguriert:

| Variable             | Required | Default-Value       | Description                                                 |
| -------------------- | -------- | ------------------- | ----------------------------------------------------------- |
| REDDIT_USERNAME      | Yes      |                     | The Reddit Username for the Bot.                            |
| REDDIT_PASSWORD      | Yes      |                     | The Reddit Password for the Bot.                            |
| REDDIT_CLIENT_ID     | Yes      |                     | The Reddit Client ID for the Bot.                           |
| REDDIT_CLIENT_SECRET | Yes      |                     | The Reddit Client-Secret for the Bot.                       |
| COMMENT_LIMIT        | No       | 5                   | Limits the Bot to how many comments per run should be read. |
| SECONDS_UNTIL_UPDATE | No       | 30                  | Interval in Seconds for the Bot.                            |
| EXTRA_KEYWORD        | No       | waecm-2020-group-09 | Adds an extra keyword to the filter for subreddit comments. |
| ANSWERS_PER_RUN      | No       | 1                   | Limits the number of answers of the Bot per run.            |

## GraphQL Dokumentation

Die Dokumentation kann unter der Adresse [localhost:8080/graphql]() im Playground aufgerufen werden.



Der **Return Type** von jeder Query und Mutation (die Subreddits betrifft) ist `SubredditModel`:

| Variable           | type     | Description                                                                   |
| ------------------ | -------- | ----------------------------------------------------------------------------- |
| _id                | String   | ID which is created by the MongoDB at creation                                |
| name               | String   | The name of the subreddit (e.g. reactjs, test). Has a length of 3-20 letters. |
| keywords           | [String] | An array with different keywords with each 2-30 letters. The bot responds to comments with those keywords, if the comment also includes the string 'waecm-2020-group-09'. |
| answer             | String   | The answer, the bot gives when commenting. Has 2-300 letters.                 |
| active             | Boolean  | Switches the bot off and on                                                   |
| description        | String   | The short subtitle of the subreddit (is fetched from Reddit)                  |
| icon               | String   | The icon of the subreddit (is fetched from Reddit)                            |
| answeredCommentIDs | [String] | Saves the IDs of the already answered comments on Reddit.                     |
| createdOn          | DateTime | Date, at which the bot was created.                                           |

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

| Variable | Type     | Description (ALL OPTIONAL)                                                    |
| -------- | -------- | ----------------------------------------------------------------------------- |
| name     | String   | The name of the subreddit (e.g. reactjs, test). Has a length of 3-20 letters. |
| keywords | [String] | An array with different keywords with each 2-30 letters. The bot responds to comments with those keywords, if the comment also includes the string 'waecm-2020-group-09'. |
| answer   | String   | The answer, the bot gives when commenting. Has 2-300 letters.                 |
| active   | Boolean  | Switches the bot off and on                                                   |

Arguments: `_id: String`, `input: UpdateSubredditInput`

Return Type:  `SubredditModel`




**createNewSubreddit**

Type in der Tabelle: *NewSubredditInput*

| Variable  | Type     | Description (ALL REQUIRED)                                                    |
| --------- | -------- | ----------------------------------------------------------------------------- |
| name      | String   | The name of the subreddit (e.g. reactjs, test). Has a length of 3-20 letters. |
| keywords  | [String] | An array with different keywords with each 2-30 letters. The bot responds to comments with those keywords, if the comment also includes the string 'waecm-2020-group-09'. |
| answer    | String   | The answer, the bot gives when commenting. Has 2-300 letters.                 |
| active    | Boolean  | Switches the bot off and on                                                   |
| createdOn | DateTime | Date, at which the bot was created.                                           |

Arguments:  `input: NewSubredditInput`

Return Type:  `SubredditModel`



**deleteSubreddit**

Arguments:  `_id: String`

Return Type:  `SubredditModel`



------

------

## Komponenten-Tests

Die Komponenten Tests sind hier zu finden:

- `src/components/AlertWithTitle.test.tsx`
- `src/components/PrimaryButton.test.tsx`

## Aufgabe 3 - Beschreibung der Lösungen

### Continous Integration



### Komponenten-Tests

Wir haben für die Komponenten `AlertWithTitle` und `PrimaryButton` Tests geschrieben, da diese nicht von externen State abhängig sind und - wie in der Aufgabenstellung beschrieben - sehr einfach aufgebaut sind. Zum Testen haben wir die `react-testing-library` verwendet, da es durch diese Library vereinfacht wird, Tests zu schreiben, welche nicht von einzelnen Implementierungsdetails abhängen, sondern rein die Funktionalität testen.

### Custom Element

Da es mit TypeScript an dieser Stelle ein paar Schwierigkeiten gab, entschieden wir uns das Custom Element als JavaScript File einzubinden. Damit dieses vorhanden ist, bevor React gestartet wird, wurde das Element in `index.tsx` noch vor rendern der App eingebunden. 

Beim Durchsuchen von GitHub Repos sind wir auf [LitElement](https://github.com/Polymer/lit-element) gestoßen, was das Erstellen von Web Components vereinfachen soll. Wir haben kurz überlegt auf diese Technologie zu wechseln, da wir aber schon fast fertig waren, blieben wir bei der Standard JavaScript API Implementierung von Custom Elements.

Da später noch ein Update zu dieser Aufgabe ins Forum geschrieben wurde, haben wir das Element in ein externes Repo ausgelagert, auf npm gepublished und so eingebunden. Das Repo kann in [GitHub] (https://github.com/aliciaschwabenbauer/custom-banner-web-element) gefunden werden.

Das Element kann einfach über npm install als Dependecy hinzugefügt werden:
`npm install custom-banner-web-element`

Um es in einer React App zu nutzen 
1. ein declarations.d.ts file erstellen: 

```
declare namespace JSX {
    interface IntrinsicElements {
        "custom-banner": any;
    }
}
```

2. in dem Komponenten: 
```
import 'custom-banner-web-element'

...

//initialize an object reference 
const ref = createRef(); 

...

// add an event listener for whatever you want to do after accept is clicked 
const el: any = ref.current;
el.addEventListener('on-accept', () => {
    // callback function 
});

...

// render function in return staement(hooks)/render function with reference set from above 
<custom-banner 
          ref={ref} 
          application-name="Name"
          policy-link="Link">
</custom-banner>
```

Um es in PlainJS zu nutzen, kann einfach das Banner.js file aus dem Repository in das HTML zu übernehmen und mit 
```
<custom-banner 
          ref={ref} 
          application-name="Name"
          policy-link="Link">
</custom-banner>
```
einzubinden.

