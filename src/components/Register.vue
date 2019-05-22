<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col s12 m8 offset-m2">
                    <div class="login card-panel blue black-text center">
                        <h3>Registro</h3>
                        <form>
                            <div class="input-field">
                                <i class="material-icons prefix">email</i>
                                <input type="text" id="email" v-model="email">
                                <label class="white-text" for="email">Email</label>
                            </div>
                            <div class="input-field">
                                <i class="material-icons prefix">lock</i>
                                <input type="password" id="password" v-model="password">
                                <label class="white-text" for="password">Password</label>
                            </div>
                            <button v-on:click="register" class="btn blue lighten-2 black-text">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
export default {
    name: 'register',
    data: function() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        register: function(e) {
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(user => {
                alert(`Account created for ${user.email}`);
                this.$router.go({ path: this.$router.path });
            },
            err => {
                alert(err.message);
            });
            e.preventDefault();
        }
    }
};
</script>