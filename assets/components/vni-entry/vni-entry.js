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
          containing: '0.75',
          color: '',
          sweet: false,
          sparkling: false
        },
        count: 6,
        location: '',
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
        if (this.entry.cepages == null)
          this.entry.cepages = []
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
      <router-link to="/cave" class="icon-back">Cave</router-link>

      <h1>Entrée</h1>

      <div class="line">
        <div class="field count">
          <label>Bouteilles</label>
          <input v-model.number="entry.count">
        </div>

        <div class="field">
          <label>Emplacement</label>
          <input type="text" v-model.trim="entry.location" name="location">
        </div>
      </div>

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

      <div class="line years">
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

      <div class="field country">
        <label>Pays</label>
        <input v-model="entry.wine.country">
      </div>

      <div class="field">
        <label>Couleur</label>
        <vni-color v-model="entry.wine.color"></vni-color>
      </div>

      <div class="field">
        <label>Cépages</label>
        <vni-cepages :cepages="entry.wine.cepages"></vni-cepages>
      </div>

      <div class="field">
        <label>Bouteille</label>
        <select v-model="entry.wine.containing">
          <option disabled>Choisissez une contenance</option>
          <option value="0.375">37.5cl</option>
          <option value="0.5">50cl</option>
          <option value="0.75">75cl</option>
          <option value="1.5">Magnum (1.5l)</option>
          <option value="3">Jéroboam (3l)</option>
          <option val="4.5">Réhoboam (4.5l)</option>
          <option val="6">Mathusalem (6l)</option>
          <option val="9">Salmanazar (9l)</option>
          <option val="12">Balthazar (12l)</option>
          <option val="15">Nabuchodonosor (15l)</option>
          <option val="18">Melchior (18l)</option>
        </select>
      </div>

      <div class="field tags">
        <div class="tag">
          <input type="checkbox" v-model="entry.wine.sweet" id="sweet"><label for="sweet">Moelleux</label>
        </div>
        <div class="tag">
          <input type="checkbox" v-model="entry.wine.sparking" id="sparkling"><label for="sparkling">Pétillant</label>
        </div>
      </div>



      <div class="field">
        <button v-on:click="$router.go(-1)">Annuler</button>
        <button v-on:click="save">{{$route.params.id ? 'Sauvegarder' : 'Créer'}}</button>
      </div>


    </div>
  `
})
