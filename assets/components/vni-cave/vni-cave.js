
const Cave = Vue.component('vni-cave', {
  data: function(){
    return {
      entries: []
    }
  },
  mounted: async function(){
    try{
      this.entries = await window.db.getEntries()
      console.log(`got all ${this.entries.length} entries`)
    }
    catch(err){
      console.error(err)
    }
  },
  template: `
    <div id="cave">
      <h2>Cave</h2>
      <router-link to="/entry">Nouvelle entrée</router-link>

      <div id="entries">
        <div v-for="entry in entries" class="entry">
          oink
        </div>
      </div>
    </div>
  `
})
