
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
  computed: {
    bottleCount: function(){
      return this.entries.reduce((count, entry) => {
        return count += entry.count
      }, 0)
    }
  },
  template: `
    <div id="cave">
      <h2>Cave</h2>
      <router-link to="/entry" class="fab"><i class="icon-plus"></i></router-link>

      Dans votre cave: {{entries.length}} entrées et {{bottleCount}} bouteilles.

      <div id="entries">
        <router-link v-for="entry in entries" class="entry" :to="{ name: 'entry', params: {id: entry.id}}" :key="entry.id">
          <div class="color-ctnr">
            <div v-if="entry.wine.color" class="color" :class="entry.wine.color">&nbsp;</div>
          </div>

          <div class="details">
            <div class="name-prod">
              <span v-if="entry.wine.name" class="name">{{entry.wine.name}}</span>
              <span class="producer">{{entry.wine.producer}}</span>
            </div>
            <div class="appellation">{{entry.wine.appellation}}</div>
          </div>

          <div class="year-count">
            <div class="count">{{entry.count}}</div>
            <div class="year">{{entry.wine.year}}</div>
          </div>

          <!--<span>{{entry.wine.appellation}}</span>
          <span>{{entry.wine.producer}}</span>
          <span>{{entry.wine.name}}</span>-->
        </router-link>
      </div>
    </div>
  `
})
