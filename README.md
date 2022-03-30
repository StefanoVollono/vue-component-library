# Vuejs Components library
Questa repository prende ispirazione dalla lettura dei seguenti articoli. (in particolare l'ultimo)
1. https://itnext.io/create-a-vue-js-component-library-as-a-module-part-1-a1116e632751 (part 1)
2. https://itnext.io/create-a-vue-js-component-library-part-2-c92a42af84e9 (part 2)
3. https://www.xiegerts.com/post/creating-vue-component-library-introduction/ (series of articles)
4. https://blog.logrocket.com/building-vue-3-component-library/ (vue3)
5. https://blog.harveydelaney.com/creating-your-own-vue-component-library/
6. https://javascript.plainenglish.io/how-to-create-test-bundle-vue-components-library-8c4828ab7b00

## Una libreria di componenti che problema risolve?
Questa repository contiene una libraria fatta in vuejs di componenti UI (ce ne sono 2 di esempio all'interno) esportata come plugin. Questo approccio (lo potete leggere anche negli articoli), risolve il problema di avere tutto in un'unica repository. Splittare il codice in piu repo e pubblicarle come pacchetto NPM, rende la repository principale più snella. Inoltre gli stessi componenti possono essere utilizzati su più repo differenti evitando cosi duplicazione di codice.

## Cosa contiene
* 2 componenti UI di prova. (Button - InputText)
* Store di vuex dedicato alla libreria salvato sotto un namespace dedicato.
* [Storybook di componenti](https://storybook.js.org/docs/vue/get-started/install) per testare live nella repository i componenti e i loro comportamenti.
* Suite di test in jest.

## Comandi principali nel package.json
* `test:unit` -> Lancia la suite test in jest (ogni componente ha il suo test) 
* `lint` -> Lancia un check del codice in base al tipo di preset scelto durante la creazione del progetto
* `serve:storybook` -> Lancia il serve locale dello storybook
* `build:storybook` -> Crea una build dello storybook
* `build:lib` -> Crea una build della libreria esportandola in formato UMD e common.js

## Organizzazione delle Folder
Il progetto è stato creato con la classica vue-cli ma non abbiamo i classici file che troviamo di default. 
* Sotto la cartella components abbiamo i singoli componenti con 3 file all'interno:
  * il file de componente Component.vue
  * Il file relativo allo storybook Component.stories.js
  * Il file relativo al Test Component.spec.js
  * Nella Root di component è presente un index in cui vengono esportati tutti i componenti. 
* Nella root abbiamo il file main.js (auto generato della cli) in cui vengono ciclati tutti i componenti prensi dall'export della index e viene esportato tutto come plugin. (compreso lo store)

## Come utilizzare in locale la libreria
Per prima cosa bisogna avviare il processo di build direttamente dalla libreria stessa, processo che deve essere leggermente modificato in quanto bisogna aggiungere il flag `--target lib` per poter avere un pacchetto di file idoneo da essere incluso in un secondo momento. Ecco nel package json il comando completo `"build:lib": "vue-cli-service build --target lib --name vue-component-library src/main.js"`. Se non si vuole esportare su NPM la libreria (soprattutto in una prima fase di test della librteria stessa in cui si fanno molte modifiche strutturali), si puo usare yarn nella repo che la ospiterà digitando `yarn add ../vue-component-library` (il percorso ovviamente dipende dalla posizione delle due repository). Questo comando aggiungerà la libreria tra le dipendenze del packgage json e creerà un symlink per poterla utilizzare. 

## Inclusione della libreria
Per utilizzare la libreria come plugin (e quindi disponibile globalmente in tutta l'app), basterà scrivere nel main.js `Vue.use(VueComponentLibrary, { store });`, e includere l'eventuale stile prodotto dal processo di dist `import 'vue-component-library/dist/vue-component-library.css';`
