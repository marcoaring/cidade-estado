import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueResource from 'vue-resource'
import swal from 'sweetalert'
import Home from './Home.vue'
import Estados from './Estados.vue'
import Cidades from './Cidades.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
	mode: 'history',
  	routes: [
  		{ 
    		path: '/', 
    		component: Home 
    	},
    	{ 
    		path: '/estados', 
    		component: Estados 
    	},
      { 
        path: '/cidades', 
        component: Cidades 
      }
  	],
});

new Vue({
 	el: '#app',
 	router,
  	render: h => h(App)
})
