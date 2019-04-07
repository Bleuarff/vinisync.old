'use strict'

const Entry = Vue.component('vni-entry', {
  data: function(){
    return {
      entry: {wine: {}},
      default: { // default entry
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
      },
      edit: false, // edit mode toggle
    }
  },
  watch: {
    $route: function(to){
      this.getEntry(to.params.id)
    }
  },
  computed: {
    containingLbl: function(){
      const v = parseFloat(this.entry.wine.containing)
      if (v < 1)
        return `${v * 100} cl`
      else
        return `${v} l`
    }
  },

  mounted: async function(){
    this.getEntry(this.$route.params.id)
  },
  methods: {
    getEntry: async function(id){
      if (!id){
        this.entry = {...this.default}
        this.edit = true
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
    <div id="entry" :class="{edit: edit}">
      <router-link to="/cave" class="icon-back">Cave</router-link>

      <h1>Entrée</h1>

      <div class="line">
        <div class="field count">
          <label>Bouteilles</label>
          <input v-if="edit" v-model.number="entry.count">
          <span v-else class="value">{{entry.count}}</span>
        </div>

        <div class="field">
          <label>Emplacement</label>
          <input type="text" v-if="edit" v-model.trim="entry.location" name="location">
          <span v-else class="value">{{entry.location}}</span>
        </div>
      </div>

      <div class="field">
        <label>Appellation</label>
        <input v-if="edit" v-model="entry.wine.appellation" class="wide">
        <span v-else class="value">{{entry.wine.appellation}}</span>
      </div>

      <div class="field">
        <label>Producteur</label>
        <input v-if="edit" v-model="entry.wine.producer" class="wide">
        <span v-else class="value">{{entry.wine.producer}}</span>
      </div>

      <div class="field">
        <label>Cuvée</label>
        <input v-if="edit" v-model="entry.wine.name" class="wide">
        <span v-else class="value">{{entry.wine.name}}</span>
      </div>

      <div class="line years" v-if="edit || entry.wine.year">
        <div class="field">
          <label>Millésime</label>
          <input v-if="edit" v-model.number="entry.wine.year">
          <span v-else class="value">{{entry.wine.year}}</span>
        </div>

        <div class="field" v-if="edit || entry.wine.apogeeStart || entry.wine.apogeeEnd">
          <label>Apogée</label>
          <div class="apogee">
            <span class="label" v-if="edit || entry.wine.apogeeStart && entry.wine.apogeeEnd">de</span>
            <input v-if="edit" v-model.number="entry.wine.apogeeStart">
            <span v-else class="value">{{entry.wine.apogeeStart}}</span>
            <span class="label" v-if="edit || entry.wine.apogeeStart && entry.wine.apogeeEnd">à</span>
            <input v-if="edit" v-model.number="entry.wine.apogeeEnd">
            <span v-else class="value">{{entry.wine.apogeeEnd}}</span>
          </div>
        </div>
      </div>

      <div class="field country" v-if="edit || entry.wine.country">
        <label>Pays</label>
        <input v-if="edit" v-model="entry.wine.country">
        <span v-else class="value">{{entry.wine.country}}</span>
      </div>

      <div class="field" v-if="edit || entry.wine.color">
        <label>Couleur</label>
        <vni-color :edit="edit" v-model="entry.wine.color"></vni-color>
      </div>

      <div class="field">
        <label>Cépages</label>
        <vni-cepages :cepages="entry.wine.cepages"></vni-cepages>
      </div>

      <div class="field" v-if="edit || entry.wine.containing">
        <label>Bouteille</label>
        <select v-if="edit" v-model="entry.wine.containing">
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
        <span v-else class="value">{{containingLbl}}</span>
      </div>

      <div class="field tags">
        <div class="tag">
          <input type="checkbox" v-model="entry.wine.sweet" id="sweet"><label for="sweet">Moelleux</label>
        </div>
        <div class="tag">
          <input type="checkbox" v-model="entry.wine.sparking" id="sparkling"><label for="sparkling">Pétillant</label>
        </div>
      </div>



      <div class="field btns">
        <button class="btn" v-on:click="$router.go(-1)">Annuler</button>
        <button class="btn" v-on:click="save">{{$route.params.id ? 'Sauvegarder' : 'Créer'}}</button>
      </div>


    </div>
  `
})
