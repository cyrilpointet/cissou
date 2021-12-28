<template>
    <div>
        <h4 class="subtitle">Nounous</h4>
        <ul class="list">
            <li v-for="nanny in baby.nannies" :key="nanny.id">
                <NannyItem :nanny="nanny"></NannyItem>
            </li>
            <li v-if="baby.nannies.length < 1">Aucune nounou</li>
        </ul>
        <div v-if="isUserParent" class="mt-4">
            <h4 class="subtitle mb-2">Ajouter une nounou</h4>
            <UserFinder @userSelected="addNanny" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import NannyItem from "../nanny/NannyItem";
import UserFinder from "../user/UserFinder";

export default {
    name: "baby-nannies",
    components: { NannyItem, UserFinder },
    computed: {
        ...mapState({
            user: (state) => state.user.user,
            baby: (state) => state.baby.baby,
        }),
        ...mapGetters({
            isLogged: "user/isLogged",
            isUserParent: "isUserParent",
        }),
    },
    methods: {
        async addNanny(userId) {
            try {
                await this.$store.dispatch("baby/addNanny", {
                    babyId: this.baby.id,
                    userId: userId,
                });
                this.$refs.accordion.toggle();
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>
