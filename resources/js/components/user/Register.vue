<template>
    <div class="flex flex-col gap-8">
        <h1 class="title text-center">Créer un compte</h1>
        <input type="text" v-model="name" placeholder="name" />
        <input type="text" v-model="email" placeholder="email" />
        <input type="password" v-model="password" placeholder="password" />
        <button @click="login">Valider</button>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    name: "user-register",
    data: () => {
        return {
            name: "",
            email: "",
            password: "",
        };
    },
    computed: {
        ...mapState({
            user: (state) => state.user.user,
        }),
        ...mapGetters({
            isLogged: "user/isLogged",
        }),
    },
    methods: {
        async login() {
            try {
                await this.$store.dispatch("user/createUser", {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });
                this.$router.push({ name: "home" });
            } catch (e) {
                alert(e);
            }
        },
    },
};
</script>
