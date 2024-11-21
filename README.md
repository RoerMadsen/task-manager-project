Arbejdsfordeling:

Amanda:
NewTask.tsx, Sass partials, theme.ts, TaskFilter.tsx

Shabana:
TaskList.tsx, types.ts

Samarbejde imellem Shabana og Amanda:
App.tsx, TaskItem.tsx, Style.scss

---

Det vi ikke nåede at lave /få til at fungere:

(som i kan se på arbejdsfordelingen har vi kun været 2 deltagende gruppemedlemmer, selvom vores tidplan var lavet ud fra at vi var 3.
Vi har efterspurgt vejledning og hjælp undervejs og der er selvfølgelig forstålse for sygdom osv fra jeres side, men det har betydet at vi har brugt meget lang tid på "små" problemer og manglende forståelse.)

Checked/isChecked flytter opgave til bunden af listen
Opgaver sorteres i kategori

opgaver gemmes i localstorage - det virkede indtil torsdag eftermiddag og vi kunne ikke få det til at virke igen

filtrering af opgaver - vi fik startet på det (se TaskFilter) men vi endte med at bruge så lang tid på checked funktionen at vi ikke nåede mere.

---

Installation og Opsætning

1. Krav

Før du begynder, skal du sikre dig, at følgende er installeret på din computer:

Node.js (version 16 eller nyere)
Download fra Node.js' officielle hjemmeside.
https://nodejs.org/en

Git (til kloning af repository)
Download fra Git's officielle hjemmeside.
https://git-scm.com/

2. Klon projektet

skriv følge kommandoer i terminalen:
git clone https://github.com/din-bruger/task-manager-app.git
cd task-manager-app

3. Installer dependencies
   skriv følgende kommandoer i terminalen:

npm install

# eller

yarn install

4. start applikationen
   Kør appen ved
   npm run dev

# åben den localhost der vises i terminalen ved cmd + klik

5. Projektets struktur

task-manager-project/
├── public/ # Statisk indhold
│ └── favicon.ico # Ikon til browser-tab
├── src/ # Applikationens kildekode
│ ├── assets/ # Skrifttyper og andre statiske ressourcer
│ ├── sass/ # SASS-partials til styling
│ ├── App.tsx # Hovedkomponent, hvor applikationens struktur defineres
│ ├── index.css # Global CSS-styling
│ ├── main.tsx # Indgangsfil, der renderer applikationen
│ ├── NewTask.tsx # Komponent til oprettelse af nye opgaver (form)
│ ├── TaskList.tsx # Komponent til listevisning af opgaver
│ ├── TaskFilter.tsx # Komponent til filtrering af opgaver
│ ├── TaskItem.tsx # Komponent til visning af en enkelt opgave
│ ├── theme.ts # Definerer farvetema og stil for applikationen
│ ├── types.ts # TypeScript-typer og interfaces brugt i applikationen
│ └── vite-env.d.ts # Miljøtyper til Vite
├── index.html # HTML-template, applikationen indlejres her
├── package.json # Projektmetadata og scripts til afhængighedsstyring
├── package-lock.json # Låsefil for afhængigheder
├── README.md # Dokumentation (denne fil)
├── tsconfig.app.json # TypeScript-konfiguration for applikationen
├── tsconfig.node.json # TypeScript-konfiguration for Node.js-relaterede scripts
└── vite.config.ts # Konfiguration til Vite (byggeværktøj)
