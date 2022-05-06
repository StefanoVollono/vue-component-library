# Vuejs Components library
Questa repository prende ispirazione dalla lettura dei seguenti articoli. (in particolare l'ultimo)
1. https://itnext.io/create-a-vue-js-component-library-as-a-module-part-1-a1116e632751 (part 1)
2. https://itnext.io/create-a-vue-js-component-library-part-2-c92a42af84e9 (part 2)
3. https://www.xiegerts.com/post/creating-vue-component-library-introduction/ (series of articles)
4. https://blog.logrocket.com/building-vue-3-component-library/ (vue3)
5. https://blog.harveydelaney.com/creating-your-own-vue-component-library/
6. https://javascript.plainenglish.io/how-to-create-test-bundle-vue-components-library-8c4828ab7b00

## Una libreria di componenti che problema risolve?
Questa repository contiene una libreria fatta in vuejs di componenti UI (ce ne sono 2 di esempio al suo interno) esportata come plugin. Questo approccio, risolve il problema di avere tutto in un'unica repository (monolite). Splittare parti di codice in piu repository, pubblicarle come pacchetto NPM e includerle come dipendenze, rende la repository principale più snella. Inoltre gli stessi componenti possono essere utilizzati su più repo differenti evitando così duplicazione di codice.

## Obiettivo finale
L'obiettivo finale come abbiamo detto, sará quello di avere una libreria di componenti UI esportata come plugin. Ogni componente avrà una sua folder dedicata, che conterrà il componente stesso, il test unitario e un file di stories.

## Cosa contiene nel dettaglio
* 2 componenti UI di esempio. (Button - InputText)
* Store di vuex dedicato alla libreria salvato sotto un namespace dedicato.
* [Storybook di componenti](https://storybook.js.org/docs/vue/get-started/install), strumento utilissimo se devi sviluppare e documentare in modo semplice e veloce (tramite le stories) componenti in un contesto isolato.
* Suite di test in jest.

## Organizzazione delle Folder
Il progetto è stato creato con la classica vue-cli ma non abbiamo i classici file che troviamo di default. 
* Sotto la cartella components abbiamo i singoli componenti con 3 file all'interno:
  * il file del componente Component.vue
  * Il file relativo allo storybook Component.stories.js
  * Il file relativo al Test Component.spec.js
  * Nella Root di component è presente un index in cui vengono esportati tutti i componenti. 
* Nella root abbiamo il file main.js (auto generato della cli) in cui vengono ciclati tutti i componenti prensi dall'export della index e viene esportato tutto come plugin. (compreso lo store)

## Get Started
Partiamo con il creare una normalissima app in Vue tramite la CLI. Nel momento in cui sto scrivendo questo articolo la versione di Vue utilizzata è la 2.6 mentre quella della vue CLI è la 4.5.15. Partiamo con il wizard selezionando a mano le feature che ci interessano.

* ◉ Babel
* ◯ TypeScript
* ◯ Progressive Web App (PWA) Support
* ◯ Router
* ◉ Vuex
* ◯ CSS Pre-processors
* ◉ Linter / Formatter -> Airbnb (Lint on save)
* ◉ Unit Testing -> JEST
* ◯ E2E Testing

## File System refactoring
Adesso che abbiamo una classica App in vue possiamo procedere con customizzare la struttura di file e cartelle per ottenere quella che sarà alla fine la nostra libreria. Cominciamo con il cancellare La cartella public e la cartella test dalla root. All'interno della cartella src cancellare anche assets, App.vue e il componente HelloWorld.vue di default. La cartella components (ormai vuota), verrà popolata dai nostri componenti organizzati in utleriori sottocartelle. Nella Root di components aggiungeremo una index.js in cui vengono esportati tutti i singoli componenti:

```
import Button from './button/Button.vue';
import InputText from './inputText/InputText.vue';

export default { Button, InputText };
```

Ogni componente, a sua volta, avrà 3 file principali:
* il file del componente Component.vue
* Il file relativo allo storybook Component.stories.js (Lo installeremo tra poco)
* Il file relativo al Test Component.spec.js

Infine nella root di src, abbiamo lasciato il nostro file main.js che andrà modificato per per far si che vengano ciclati tutti i componenti presi dall'export della index e venga esportato il tutto come plugin. (compreso lo store).





## Comandi principali nel package.json
* `test:unit` -> Lancia la suite test in jest (ogni componente ha il suo test) 
* `lint` -> Lancia un check del codice in base al tipo di preset scelto durante la creazione del progetto
* `serve:storybook` -> Lancia il serve locale dello storybook
* `build:storybook` -> Crea una build dello storybook
* `build:lib` -> Crea una build della libreria esportandola in formato UMD e common.js

## Come utilizzare in locale la libreria
Per prima cosa bisogna avviare il processo di build direttamente dalla libreria stessa, processo che deve essere leggermente modificato in quanto bisogna aggiungere il flag `--target lib` per poter avere un pacchetto di file idoneo da essere incluso in un secondo momento. Ecco nel package json il comando completo `"build:lib": "vue-cli-service build --target lib --name vue-component-library src/main.js"`. Se non si vuole esportare su NPM la libreria (soprattutto in una prima fase di test della librteria stessa in cui si fanno molte modifiche strutturali), si puo usare yarn nella repo che la ospiterà digitando `yarn add ../vue-component-library` (il percorso ovviamente dipende dalla posizione delle due repository). Questo comando aggiungerà la libreria tra le dipendenze del packgage json e creerà un symlink per poterla utilizzare. 

## Inclusione della libreria
Per utilizzare la libreria come plugin (e quindi disponibile globalmente in tutta l'app), basterà scrivere nel main.js `Vue.use(VueComponentLibrary, { store });`, e includere l'eventuale stile prodotto dal processo di dist `import 'vue-component-library/dist/vue-component-library.css';`
