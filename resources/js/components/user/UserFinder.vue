<template>
    <div>
        <h5>Add nanny</h5>
        <input v-model="email" placeholder="email" />
        <button @click="findUser">chercher</button>
        <p v-if="!userByMail">personne</p>
        <div v-else>
            <p>{{ userByMail.name }}</p>
            <p>{{ userByMail.email }}</p>
            <button @click="$emit('userSelected', userByMail.id)">
                Ajouter
            </button>
        </div>
    </div>
</template>

<script>
import { ApiConsumer } from "../../services/ApiConsumer";

export default {
    name: "user-finder",
    data: () => {
        return {
            email: "",
            userByMail: null,
        };
    },
    methods: {
        async findUser() {
            try {
                const userByMail = await ApiConsumer.post("find", {
                    email: this.email,
                });
                this.userByMail = userByMail;
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>
