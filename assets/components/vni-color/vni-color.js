'use strict'

const Color = Vue.component('vni-color', {
  model: {
    prop: 'color',
    event: 'color-select'
  },
  props: {
    color: String,
  },
  methods: {
    select(val){
      this.$emit('color-select', val)
    }
  },
  template: `
    <div id="colorpick">
      <div class="red" v-on:click="select('red')" :class="{selected: color == 'red'}">ROUGE</div>
      <div class="white" v-on:click="select('white')" :class="{selected: color == 'white'}">BLANC</div>
      <div class="rose" v-on:click="select('rose')" :class="{selected: color == 'rose'}">ROSÉ</div>
    </div>
  `
})
