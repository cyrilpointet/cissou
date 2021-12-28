<template>
    <div>
        <div class="flex items-center gap-4">
            <label class="grow"
                >Email
                <input
                    @keydown="hasSearched = false"
                    type="email"
                    v-model="email"
                    placeholder="email"
                />
            </label>

            <button icon @click="findUser" class="mt-4">
                <span class="material-icons">search</span>
            </button>
        </div>

        <div v-if="hasSearched">
            <div v-if="!userByMail">
                <p>Aucun utilisateur correspondant à cet email</p>
            </div>
            <div v-else>
                <p>{{ userByMail.name }}</p>
                <p>{{ userByMail.email }}</p>
                <button @click="$emit('userSelected', userByMail.id)">
                    Ajouter
                </button>
            </div>
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
            hasSearched: false,
        };
    },
    methods: {
        async findUser() {
            this.userByMail = null;
            try {
                const userByMail = await ApiConsumer.post("find", {
                    email: this.email,
                });
                this.userByMail = userByMail;
            } catch (error) {
                console.log(error.response.status);
            }
            this.hasSearched = true;
        },
    },
};
</script>
