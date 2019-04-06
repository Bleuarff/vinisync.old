'use strict'

// TODO: 
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
  watch: {
    newValue: function(val){
      setTimeout(() => {
        const w = this.lenref.getBoundingClientRect().width
        if (w >= 60){
          this.editor.style.width = `${w + 5}px`
        }
      }, 0)
    }
  },
  mounted: function(){
    this.editor = document.getElementById('editor')
    this.lenref =document.getElementById('lenref')
  },
  methods: {
    startEdit: function(e){
      if (e.target !== e.currentTarget || this.editing)
        return

      this.editing = true
    },

    stopEdit: function(){
      this.editing = false
      this.newValue = ''
      this.editor.style.width = ''
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
      this.editor.style.width = ''
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
      <input id="editor" v-model.trim="newValue" v-show="editing" v-focus="editing" v-on:keyup.enter.esc="addCpg" v-on:blur="stopEdit" tabindex="0"> <!-- -->
      <span id="lenref">{{ newValue }}</span>
    </div>
    <span class="err">{{err}}</span>
  </div>
  `
})
