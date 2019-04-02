const Err404 = Vue.component('vni-err404', {
  template: `
    <div>
      <h1>Page not found</h1>

      <p>Path {{$route.path}} not found.</p>
    </div>
  `
})
