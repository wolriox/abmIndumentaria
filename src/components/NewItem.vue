<template>
    <div id="new-item">
        <h3>Nuevo Artículo</h3>
        <div class="row">
            <form @submit.prevent="saveItem" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="item_id" required>
                        <label>SKU</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                        <label>Nombre</label>
                    </div>
                </div>
                <button type="submit" class="btn">Crear</button>
                <router-link to="/" class="btn grey">Cancelar</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'new-item',
    data () {
        return {
            item_id: null,
            name: null
        }
    },
    methods: {
        saveItem () {
            db.collection('items').add({
                item_id: this.item_id,
                name: this.name
            })
            .then(docRef => this.$router.push('/'))
            .catch(error => console.log(err))
        }
    }
}
</script>