<template>
    <div id="view-item">
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>{{name}}</h4>
            </li>
            <li class="collection-item">SKU: {{item_id}}</li>
        </ul>
        <router-link to="/" class="btn grey">Volver</router-link>
        <button @click="deleteItem" class="btn red">Borrar</button>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'view-item',
    data () {
        return {
            item_id: null,
            name: null
        }
    },
    beforeRouteEnter (to, from, next) {
        db.collection('items').where('item_id', '==', to.params.item_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.item_id = doc.data().item_id
                    vm.name = doc.data().name
                })
            })
        })
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData() {
            db.collection('items').where('item_id', '==', this.$route.params.item_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.item_id = doc.data().item_id
                    this.name = doc.data().name
                })
            })
        },
        deleteItem () {
            if(confirm('¿Está seguro?')) {
                db.collection('items').where('item_id', '==',
                this.$route.params.item_id).get()
                .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete();
                    this.$router.push('/')
                })
            })
            }
        }
    }
}
</script>