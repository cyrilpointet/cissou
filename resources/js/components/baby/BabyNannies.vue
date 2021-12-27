<template>
    <div>
        <h4 class="subtitle">Nounous</h4>
        <ul class="list" v-if="baby.nannies.length > 0">
            <li v-for="nanny in baby.nannies" :key="nanny.id">
                <NannyItem :nanny="nanny"></NannyItem>
            </li>
            <li v-if="baby.nannies.length < 1">Aucune nounou</li>

            <li v-if="isUserParent">
                <Accordion ref="accordion">
                    <template v-slot:title>
                        <strong class="grow">Ajouter une nounou</strong>
                    </template>
                    <template v-slot:body>
                        <UserFinder @userSelected="addNanny" />
                    </template>
                </Accordion>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import NannyItem from "../nanny/NannyItem";
import UserFinder from "../user/UserFinder";
import Accordion from "../common/Accordion";

export default {
    name: "baby-nannies",
    components: { NannyItem, UserFinder, Accordion },
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
