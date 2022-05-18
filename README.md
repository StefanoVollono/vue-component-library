## Una libreria di componenti che problema risolve?
Questa repository contiene una libreria fatta in vuejs 2.x di componenti UI (ce ne sono 2 di esempio al suo interno) esportata come plugin. Questo approccio, risolve il problema di avere tutto in un'unica repository (monolite). Splittare parti di codice in più repository, pubblicarle come pacchetto NPM e includerle come dipendenze versionate, rende la repository principale più snella. Inoltre gli stessi componenti possono essere utilizzati su più repo differenti evitando così duplicazione di codice.

## Obiettivo finale
L'obiettivo finale come abbiamo detto, sará quello di avere una libreria di componenti UI esportata come plugin. Ogni componente avrà una sua folder dedicata, che conterrà il componente stesso, il test unitario e un file di stories.

## Cosa contiene nel dettaglio
* 2 componenti UI di esempio. (Button - InputText)
* Store di vuex dedicato alla libreria salvato sotto un namespace dedicato.
* Storybook di componenti.
* Suite di test in jest.

## Puoi leggere l'articolo completo a questo link: 
