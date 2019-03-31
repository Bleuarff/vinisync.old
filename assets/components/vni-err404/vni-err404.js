const Err404 = Vue.component('vni-err404', {
  template: `
    <div>
      <h2>Page not found</h2>

      <p>Path {{$route.path}} not found.</p>
    </div>
  `
})
