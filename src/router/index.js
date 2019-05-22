import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import NewItem from '@/components/NewItem';
import ViewItem from '@/components/ViewItem';
import EditItem from '@/components/EditItem';
import Login from '@/components/Login';
import Register from '@/components/Register';
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-item',
      component: NewItem,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:item_id',
      name: 'edit-item',
      component: EditItem,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:item_id',
      name: 'view-item',
      component: ViewItem,
      meta: {
        requiresAuth: true
      }
    },
  ]
});

// Nav Guards
router.beforeEach((to, from, next) => {
  // Chequea requiredAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // Chequea si NO esta logueado
    if(!firebase.auth().currentUser){
      // Ir a Ingresar
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Procede a la ruta
      next();
    }
  } else if(to.matched.some(record => record.meta.requiresGuest)) {
      // Chequea si esta logueado
      if(firebase.auth().currentUser){
      // Ir a Ingresar
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Procede a la ruta
      next();
    }
  } else {
    // Procede a la ruta
    next();
  }
});

export default router;
