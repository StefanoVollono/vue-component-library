## Una libreria di componenti che problema risolve?
Questa repository contiene una libreria fatta in vuejs 2.x di componenti UI (ce ne sono 2 di esempio al suo interno) esportata come plugin. Questo approccio, risolve il problema di avere tutto in un'unica repository (monolite). Splittare parti di codice in più repository, pubblicarle come pacchetto NPM e includerle come dipendenze versionate, rende la repository principale più snella. Inoltre gli stessi componenti possono essere utilizzati su più repo differenti evitando così duplicazione di codice.

## Obiettivo finale
L'obiettivo finale come abbiamo detto, sará quello di avere una libreria di componenti UI esportata come plugin. Ogni componente avrà una sua folder dedicata, che conterrà il componente stesso, il test unitario e un file di stories. Tutto quello che ti spiegherò da qui in avanti e i relativi frammenti di codice fanno riferimento a [questa repository](https://github.com/StefanoVollono/vue-component-library) di github che ho creato appositamente per l'articolo.

## Cosa contiene nel dettaglio
* 2 componenti UI di esempio. (Button - InputText)
* Store di vuex dedicato alla libreria salvato sotto un namespace dedicato.
* Storybook di componenti.
* Suite di test in jest.

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

## Modifichiamo la struttura di file e cartelle
Adesso che abbiamo una classica App in vue possiamo procedere con modificare la struttura di file e cartelle per ottenere quella che sarà alla fine la nostra libreria. Cominciamo con il cancellare la cartella public e la cartella tests dalla root. All'interno della cartella src cancellare anche assets, App.vue e il componente HelloWorld.vue di default. La cartella components (ormai vuota), verrà popolata dai nostri componenti organizzati in utleriori sottocartelle. Nella Root di components aggiungeremo una index.js in cui vengono esportati tutti i singoli componenti:

```
import Button from './button/Button.vue';
import InputText from './inputText/InputText.vue';

export default { Button, InputText };
```

Ogni componente, a sua volta, avrà 3 file principali:
* il file del componente Component.vue
* Il file relativo allo storybook Component.stories.js (Lo installeremo tra poco)
* Il file relativo al Test Component.spec.js

Infine nella root di src, abbiamo lasciato il nostro file main.js che andrà modificato per per far si che nella funzione di install, vengano ciclati tutti i componenti presi dall'export della index e venga esportato il tutto (compreso lo store) come plugin registrando globalmente ogni componente sull'istanza di Vue.

```
import components from './components/index';
import store from './store';

const ComponentLibrary = {
  install(Vue = {}, options) {
    // Lo store Vuex, registrato sotto il namespace 'vueComponentLibraryStore', viene passato come option al momento del suo utilizzo come plugin
    options.store.registerModule('vueComponentLibraryStore', store);

    // Ciclo i componenti esportati da components/index e li registro globalmente sull'istanza di Vue.
    Object.keys(components).forEach((key) => {
      const component = components[key];
      Vue.component(component.name, component);
    });
  },
};

export default ComponentLibrary;
```

## Storybook
Adesso che siamo pronti con la struttura base della nostra library, possiamo installare lo Storybook, strumento utilissimo se devi sviluppare e documentare in modo semplice e veloce (tramite le stories) componenti in un contesto isolato. Una singola storia quindi acquisisce lo stato di rendering del componente a cui quella storia fa riferimento. Si possono scrivere più storie per componente e ogni storia descrive tutti gli stati che un componente può supportare. Per installare lo storybook su un'app in vue già esistente, basta seguire le istruzioni indicate sulla [documentazione ufficiale](https://storybook.js.org/docs/vue/get-started/install).

```
# Add Storybook:
npx sb init
```

Il comando installerà in pochi secondi tutto il necessario per startare in locale lo storybook, creando nella root di src una cartella chiamata stories, con alcuni esempi all'interno. Non ci serve e puoi tranquillamente cancellarla. Nella root del progetto abbiamo anche una cartella .storybook con all'interno un file main.js. che andrà modificato affinchè vada a pescare tutti i file di stories all'interno di components.

```
module.exports = {
  "stories": [
    "../src/components/**/*.stories.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/vue"
}
```

Siamo pronti per creare il nostro primo componente. Un bottone. Voglio ricordarti che tutto quello che stiamo vedendo è ovviamente molto semplificato e anche il componente stesso di UI è ridotto al minimo per dare piu spazio ai concetti generali di libreria di componenti.

## Button component
Come abbiamo già detto più volte ogni componente sarà composto da 3 file. 

### Button.vue
Partiamo con il file del componente vue. É un semplicissimo bottone con 2 prop (size e label) e al click viene emittato un evento 'btnLibClicked'. Anche lo stile è molto basico. Contiene giusto le regole base e alcuni modificatori per cambiare il size del bottone stesso. Il codice completo del bottone lo trovate nella repository che ho creato per questo articolo. Ti ricordo che puoi trovarla [qui](https://github.com/StefanoVollono/vue-component-library).

```
<button @click="onClickBtn" class="Button" :class="classes">
  {{ text }}
</button>
```

### Button.spec.js
Il secondo file è il test. Se non hai conoscenze di Unit testing e Vue ti consiglio di andare ad approfondire le basi [qui](https://v2.vuejs.org/v2/guide/testing.html). Ci sarebbero moltissime cose da dire anche qui. Cerchiamo di analizzarlo a grandi linee. Prima di tutto importiamo il nostro componente Button e creiamo il nostro wrapper che contiene il [componente Vue montato e renderizzato](https://v1.test-utils.vuejs.org/api/#mount). Il nostro wrapper può essere creato con o senza options. In questo particolare caso, abbiamo utilizzato [propsdata](https://v1.test-utils.vuejs.org/api/options.html#propsdata) per settare una prop (label) quando il componente è montato. Il nostro expect infine prevede che sull'istanza del componente appena montato il valore della prop label sia proprio 'Lorem ipsum'. Il nostro test è terminato. Ripeto, abbiamo scalfito solo la superficie. 

```
import { mount } from '@vue/test-utils';
import Button from '@/components/button/Button.vue';

describe('Button.vue', () => {

  const wrapper = mount(Button, {
    propsData: {
      label: 'Lorem ipsum'
    }
  });

  it('renders props.label when passed', () => {
    expect(wrapper.props().label).toBe('Lorem ipsum');
  });

});
```

Cosa importante prima di dicontinuare è modificare il file jest.config.js cambiando il path del testMatch cosi che vada a matchare tutti i file di test all'interno della cartella components.

```
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/components/**/*.spec.js?(x)'],
};
```

### Button.stories.js
L'ultimo file da creare è proprio il file dello storybook. Prima ti ho spiegato come installarlo, adesso siamo pronti per creare la nostra prima storia, che come ti dicevo rappresenta un particolare stato del componente stesso. Possiamo creare una storia nel modo più semplice possibile e cioè replicando staticamente tutte le varianti e prop ma non è sicuramente un modo molto efficace per descrivere i nostri elementi di UI. Soprattuto per quelli molto complessi. Ecco un esempio di come potrebbe essere scritto:

```
import Button from './Button.vue';

export default {
  title: 'Vue UI Library/Button',
  component: Button,
};

export const Small = () => ({
  components: { Button },
  template: '<Button size="small" label="Button Label" />',
});

export const Medium = () => ({
  components: { Button },
  template: '<Button size="medium" label="Button Label" />',
});
```

Proviamo a fare un passo in avanti, ultilizzando gli storybook Args, che ci consentono di comporre gli argomenti in modo dinamico per poterne avere poi più controllo tramite gli ArgTypes e modificarne i valori tramite i controlli. In particolare gli Storybook Controls offrono la possibilità di  interagire dinamicamente con gli args di un componente senza bisogno di modificare il codice. [Avrai a disposizione](https://storybook.js.org/docs/vue/essentials/controls) select, input, switch, radiobox, etc per poter modificare live il tuo componente. Possiamo specificare quali controlli utilizzare, dichiarando un argType personalizzato. Gli ArgType sono una funzionalità di Storybook per specificare il comportamento degli Args. In questo caso per esempio ho deciso di usare una select per modificare il valore della prop size del componente.

```
export default {
  title: 'Vue UI Library/Button',
  component: Button,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
```

ed ecco un esempio di come si possono usare gli args per definire un template e associarlo a tutte le storie di un componente. Ogni storia puo definire alcuni valori di default per costruire uno stato particolare del componente e visualizzarlo cosi nella barra laterale come elemento della lista. Ad esempio qui stiamo definendo una storia che descrive un bottone di tipo Small, il cui testo è Button. 

```
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
});

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};

export const PrimaryLongName = Template.bind({});
PrimaryLongName.args = {
  ...Small.args,
  label: 'Primary with a really long name',
};
```

La cosa comoda è che questi args, sono definiti a livello di storia ma possono facilmente utilizzati cross stories tramite lo spread operator. Quindi se dobbiamo replicare un bottone di tipo small ma con una label differente o proprietà differenti, possiamo farlo nel modo seguente. 

```
export const SmallLongName = Template.bind({});
SmallLongName.args = {
  ...Small.args,
  label: 'Primary with a really long name',
};
```

Infine possiamo avere anche args a livello di componente, questi tipi di argomenti definiti cosi, verranno ereditati da tutte le stories del componente stesso.

```
export default {
  title: 'Button',
  component: Button,
  args: {
    size: 'small',
  },
};
```

Ci sono tante altre feature e addons interessanti da poter utilizzare. Per questo ti rimando alla [documentazione ufficiale](https://storybook.js.org/docs/vue/writing-stories/introduction) in cui potrai trovare tutte le informazioni necessarie per scrivere delle storie complete di tutto. 

## File package.json
Anche questo file deve essere leggermente modificato affichè tutto funzioni correttamente. Di seguito ecco una lista di comandi importanti da tenere sempre sotto mano.

* `test:unit` -> Lancia la suite test in jest (ogni componente ha il suo test) 
* `lint` -> Lancia un check del codice in base al tipo di preset scelto durante la creazione del progetto
* `serve:storybook` -> Lancia il serve locale dello storybook
* `build:storybook` -> Crea una build dello storybook
* `build:lib` -> Crea una build della libreria esportandola in formato UMD e common.js

In particolare il comando di build, comando che deve essere leggermente modificato in quanto bisogna aggiungere il flag `--target lib` per poter avere un pacchetto di file idoneo da essere incluso in un secondo momento. Ecco il comando completo: 

```"build:lib": "vue-cli-service build --target lib --name vue-component-library src/main.js"```

Altra nota importante. Le dependencies sono state svuotate. la dipendenza di vue è stata definita come [peer dependencies](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies), cosi durante il processo di build non viene incluso anche tutto il pacchetto di vue, ma sarà responsablita della repository che ospita la libraria ad avere tale dipendenza.

```
"peerDependencies": {
    "vue": "^2.6.11"
  },
```

## Come utilizzare in locale la libreria (senza doverla pubblicare su NPM)
Per prima cosa bisogna avviare il processo di build direttamente dalla libreria stessa. Se non si vuole esportare su NPM la libreria (soprattutto in una prima fase di test della librteria stessa in cui si fanno molte modifiche strutturali), si puo usare ad esempio yarn nella repository che la ospiterà digitando `yarn add ../vue-component-library` (il percorso ovviamente dipende dalla posizione delle due repository). [Questo comando](https://classic.yarnpkg.com/en/docs/cli/add) aggiungerà la libreria (locale) tra le dipendenze del packgage.json.

## Inclusione della libreria
Per utilizzare la libreria come plugin (e quindi disponibile globalmente in tutta l'app), basterà scrivere nel main.js della repo ospitante e includere l'eventuale stile prodotto dal processo di dist:

```
import Vue from 'vue';
import VueComponentLibrary from 'vue-component-library';
import App from './App.vue';
import store from './store';
import 'vue-component-library/dist/vue-component-library.css';

Vue.config.productionTip = false;

Vue.use(VueComponentLibrary, { store });

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
```

Infine per utilizzare la library, basterà includere i componenti e usarli come qualsiasi altro componente scritto in Vue:

```
<template>
  <div class="LibraryTest">
    <InputText label="Prova label" @inputLibChange="onLibraryCatchEvent"/>
    <Button @btnLibClicked="onLibraryCatchEvent" />
  </div>
</template>
```

# Bibliografia
Questa repository prende ispirazione dalla lettura dei seguenti articoli.
1. https://itnext.io/create-a-vue-js-component-library-as-a-module-part-1-a1116e632751 (part 1)
2. https://itnext.io/create-a-vue-js-component-library-part-2-c92a42af84e9 (part 2)
3. https://www.xiegerts.com/post/creating-vue-component-library-introduction/ (series of articles)
4. https://blog.logrocket.com/building-vue-3-component-library/ (vue3)
5. https://blog.harveydelaney.com/creating-your-own-vue-component-library/
6. https://javascript.plainenglish.io/how-to-create-test-bundle-vue-components-library-8c4828ab7b00
