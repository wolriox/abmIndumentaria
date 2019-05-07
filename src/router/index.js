import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewItem from '@/components/NewItem'
import ViewItem from '@/components/ViewItem'
import EditItem from '@/components/EditItem'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-item',
      component: NewItem
    },
    {
      path: '/edit/:item_id',
      name: 'edit-item',
      component: EditItem
    },
    {
      path: '/:item_id',
      name: 'view-item',
      component: ViewItem
    },
  ]
})
