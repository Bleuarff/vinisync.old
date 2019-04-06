'use strict'

// TODO: adapt textbox width to input length
// - show dropdown suggestions w/selection
// - add new value to ref list if really new
const Cepages = Vue.component('vni-cepages', {
  model: {
    prop: 'cepages',
    event: 'change'
  },
  props: {
    cepages: Array,
  },
  data: function(){
    return {
      newValue: '',
      editing: false,
      reference: ['syrah', 'grenache', 'mourvèdre', 'malbec', 'sauvignon', 'rolle', 'pinot noir'],
      err: '',
    }
  },
  methods: {
    startEdit: function(e){
      if (e.target !== e.currentTarget || this.editing)
        return

      this.editing = true
    },

    addCpg: function(e){
      if (!this.newValue || e.key === 'Escape'){
        this.newValue = ''
        this.editing = false
        return
      }

      const value = this.newValue.toLowerCase(),
            isNew = this.cepages.indexOf(value)

      if (isNew)
        this.cepages.push(value)

      this.newValue = ''
    }
  },
  directives: {
    focus: {
      // directive definition
      update: function (el, binding) {
        if (binding.value && !binding.oldValue)
          el.focus()
      }
    }
  },
  template: `
  <div id="cepages-editor">
    <div class="ctnr" v-on:click="startEdit">
      <div v-for="cepage in cepages" class="cpg">{{ cepage }}</div>
      <input id="editor" v-model.trim="newValue" v-show="editing" v-focus="editing" tabindex="0" v-on:keyup.enter.esc="addCpg">
    </div>
    <span class="err">{{err}}</span>
  </div>
  `
})
