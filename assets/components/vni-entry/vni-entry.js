'use strict'

const Entry = Vue.component('vni-entry', {
  data: function(){
    return {
      entry: {
        // id: 1,
        appellation: 'St-Joseph',
        producer: 'Domaine de la Ville rouge',
        name: 'Cuvée du Potier',
        year: '2016',
        country: 'France',
        apogeeStart: null,
        apogeeEnd: null,
        cepages: [],
        containing: '75cl',
        color: null,
        location: null,
        sweet: false,
        sparkling: false
      }
    }
  },
  methods: {
    save: async function(){
      try{
        let newId = await db.saveEntry(this.entry)
        console.debug('save ok ! new id ' + newId)
      }
      catch(err){
        console.error(err)
      }
    },
    cancel: function(){

    }
  },

  template: `
    <div id="entry">
      <h2>Entrée</h2>

      <router-link to="/cave">Cave</router-link>

      <div class="field">
        <label>Appellation</label>
        <input v-model="entry.appellation">
      </div>

      <div class="field">
        <label>Producteur</label>
        <input v-model="entry.producer">
      </div>

      <div class="field">
        <label>Cuvée</label>
        <input v-model="entry.name">
      </div>


      <div class="field">
        <label>Millésime</label>
        <input v-model="entry.year">
      </div>


      <div class="field">
        <label>Pays</label>
        <input v-model="entry.country">
      </div>


      <div class="field">
        <button v-on:click="cancel">Annuler</button>
        <button v-on:click="save">Créer</button>
      </div>

    </div>
  `
})
