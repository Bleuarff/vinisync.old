'use strict'

const Entry = Vue.component('vni-entry', {
  data: function(){
    return {
      entry: {},
      default: {
        // id: 1,
        appellation: '',
        producer: '',
        name: '',
        year: '',
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
  watch: {
    $route: function(to){
      // console.log('route updated')
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
          console.debug('TODO: update item')
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
        <button v-on:click="save">{{$route.params.id ? 'Sauvegarder' : 'Créer'}}</button>
      </div>

    </div>
  `
})
