'use strict'

// TODO:
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
      reference: ['syrah', 'grenache', 'mourvèdre', 'malbec', 'sauvignon', 'rolle', 'pinot noir', 'cabernet franc', 'cabernet sauvignon', 'chenin', 'melon de bourgogne'],
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
  computed: {
    suggestions: function(){
      return this.newValue.length < 3 ? [] : this.reference.filter(x => x.startsWith(this.newValue))
    }
  },
  mounted: function(){
    this.editor = document.getElementById('editor')
    this.lenref =document.getElementById('lenref')
  },
  methods: {
    // show input text
    startEdit: function(e){
      if (e.target !== e.currentTarget || this.editing)
        return

      this.editing = true
    },

    stopEdit: function(){
      setTimeout(this.clearEdit, 250)
    },

    // hide input text, reset input value
    clearEdit: function(){
      this.editing = false
      this.newValue = ''
      this.editor.style.width = ''
    },

    // add cepage when user presses enter or escape
    addCpg: function(e){
      if (!this.newValue || e.key === 'Escape'){
        this.lenref.focus() // force editor to lose focus
        return
      }

      const value = this.newValue.toLowerCase(),
            isNew = this.cepages.indexOf(value) === -1

      if (isNew)
        this.cepages.push(value)

      this.newValue = ''
      this.editor.style.width = ''
    },

    // add when user clicks a suggested cepage
    addSuggestion: function(val){
      val = val.toLowerCase()
      const isNew = this.cepages.indexOf(val) === -1

      if (isNew)
        this.cepages.push(val)

      this.clearEdit()
      setTimeout(() => {
        this.$el.getElementsByClassName('ctnr')[0].click()
      }, 250)
    },

    // remove cepage from list
    remove: function(cpg){
      const idx = this.cepages.indexOf(cpg)
      if (idx > -1)
        this.cepages.splice(idx, 1)
    }


  },
  directives: {
    focus: {
      update: function (el, binding) {
        if (binding.value && !binding.oldValue)
          el.focus()
      }
    }
  },
  template: `
  <div id="cepages-editor">
    <div class="ctnr" v-on:click="startEdit" tabindex="0">
      <div v-for="cepage in cepages" class="cpg" v-on:click="$event.currentTarget.classList.toggle('deletable')">
      {{ cepage }}
      <span class="icon-cancel" v-on:click="remove(cepage)"></span>
      </div>

      <input id="editor" v-model.trim="newValue" v-show="editing" v-focus="editing" v-on:keyup.enter.esc="addCpg" v-on:blur="stopEdit" tabindex="0"> <!-- -->
      <span id="lenref" tabindex="5">{{ newValue }}</span>
    </div>
    <div class="ac" v-show="suggestions.length">
      <div v-for="cpg in suggestions" class="cpg suggestion" v-on:click="addSuggestion(cpg)">
        {{cpg}}
      </div>
    </div>
  </div>
  `
})
