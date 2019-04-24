<template>
    <div id="dashboard">
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>Artículos</h4>
            </li>
            <li v-for="item in items" v-bind:key="item.id" class="collection-item">
                {{item.name}}
            </li>
        </ul>
        
        
        <div class="fixed-action-btn">
            <router-link to="/new" class="btn-floating btn-large green">
                <i class="fa fa-plus"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'dashboard',
    data () {
        return {
            items: []
        }
    },
    created () {
        db.collection('items').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {                
                const data = {
                    'id': doc.id,
                    'item_id': doc.data().item_id,
                    'name': doc.data().name,

                }
                this.items.push(data)
            })
        })
    }
}
</script>
