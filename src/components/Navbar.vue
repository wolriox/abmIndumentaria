<template>
    <nav>
        <div class="nav-wrapper grey darken-4">
            <div class="container">
                <router-link to="/" class="brand-logo">Gestión de Stock</router-link>
                <ul class="right">
                    <li v-if="isLoggedIn"><span class="email red-text">{{currentUser}}</span></li>
                    <li v-if="isLoggedIn"><router-link to="/">Inicio</router-link></li>
                    <li v-if="!isLoggedIn"><router-link to="/login">Ingresar</router-link></li>
                    <li v-if="!isLoggedIn"><router-link to="/register">Registrarse</router-link></li>
                    <li v-if="isLoggedIn"><button v-on:click="logout" class="btn black">Cerrar sesión</button></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import firebase from 'firebase';
export default {
    name: 'navbar',
    data() {
        return {
            isLoggedIn: false,
            currentUser: false
        }
    },
    created() {
        if(firebase.auth().currentUser) {
            this.isLoggedIn = true;
            this.currentUser = firebase.auth().currentUser.email;
        }
    },
    methods: {
        logout: function() {
            firebase
            .auth()
            .signOut()
            .then(() => {
                this.$router.go({ path: this.$router.path });
            });
        }
    }
};
</script>

<style scoped>
.email{
    padding-right: 10px;
}
</style>

