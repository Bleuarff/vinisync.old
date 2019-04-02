'use strict'

const Entry = Vue.component('vni-entry', {
  data: function(){
    return {
      entry: {wine: {}},
      default: {
        // id: 1,
        wine: {
          appellation: '',
          producer: '',
          name: '',
          year: '',
          country: 'France',
          apogeeStart: null,
          apogeeEnd: null,
          cepages: [],
          containing: '75cl',
          color: '',
          location: null,
          sweet: false,
          sparkling: false
        },
        count: 6
      }
    }
  },
  watch: {
    $route: function(to){
      this.getEntry(to.params.id)
    }
  },

  mounted: async function(){
    this.getEntry(this.$route.params.id)
  },
  methods: {
    getEntry: async function(id){
      if (!id){
        this.entry = {...this.default}
        return
      }

      await db.connected
      try{
        this.entry = await db.getEntry(id)
      }
      catch(err){
        console.error(err)
      }
    },
    save: async function(){
      try{
        if (this.$route.params.id){
          await db.updateEntry(this.entry)
          console.log(`updated ${this.$route.params.id}`)
        }
        else {
          let newId = await db.saveEntry(this.entry)
          this.$router.push(`/entry/${newId}`)
        }
      }
      catch(err){
        console.error(err)
      }
    },
  },

  template: `
    <div id="entry">
      <h2>Entrée</h2>

      <router-link to="/cave">Cave</router-link>

      <div class="field">
        <label>Appellation</label>
        <input v-model="entry.wine.appellation" class="wide">
      </div>

      <div class="field">
        <label>Producteur</label>
        <input v-model="entry.wine.producer" class="wide">
      </div>

      <div class="field">
        <label>Cuvée</label>
        <input v-model="entry.wine.name" class="wide">
      </div>

      <div class="years">
        <div class="field">
          <label>Millésime</label>
          <input v-model.number="entry.wine.year">
        </div>

        <div class="field">
          <label>Apogée</label>
          <div class="apogee">
            <span class="label">de</span>
            <input v-model.number="entry.wine.apogeeStart">
            <span class="label">à</span>
            <input v-model.number="entry.wine.apogeeEnd">
          </div>
        </div>
      </div>


      <div class="field">
        <label>Pays</label>
        <input v-model="entry.wine.country">
      </div>

      <div class="field">
        <label>Couleur</label>
        <vni-color v-model="entry.wine.color"></vni-color>
      </div>



      <div class="field">
        <button v-on:click="$router.go(-1)">Annuler</button>
        <button v-on:click="save">{{$route.params.id ? 'Sauvegarder' : 'Créer'}}</button>
      </div>


    </div>
  `
})
