
const Cave = Vue.component('vni-cave', {
  data: function(){
    return {
      entries: []
    }
  },
  mounted: async function(){
    try{
      await db.connected
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
      <!-- :to="{ path: '/entry', params: {id: entry.id} }" -->
      <!--  <router-link v-for="entry in entries" class="entry" to="/entry/6" :key="entry.id"> -->
        <router-link v-for="entry in entries" class="entry" :to="{ name: 'entry', params: {id: entry.id}}" :key="entry.id" :data-eid="entry.id">
          {{entry.id}}
          <span>{{entry.appellation}}</span>
          <span>{{entry.producer}}</span>
          <span>{{entry.name}}</span>
        </router-link>
      </div>
    </div>
  `
})
