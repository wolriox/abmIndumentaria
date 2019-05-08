<template>
    <div id="edit-item">
        <h3>Editar Artículo</h3>
        <div class="row">
            <form @submit.prevent="updateItem" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="item_id" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                    </div>
                </div>
                <button type="submit" class="btn">Aceptar</button>
                <router-link to="/" class="btn grey">Cancelar</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'edit-item',
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
        updateItem() {
            db.collection('items').where('item_id', '==', this.$route.params.item_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        item_id: this.item_id,
                        name: this.name
                    })
                    .then(() => {
                        this.$router.push({name: 'view-item', params: {item_id: this.item_id}})
                    })
                })
            })
        }
    }
}
</script>