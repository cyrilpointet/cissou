<template>
    <div>
        <div v-if="baby">
            <h1>{{ baby.name }}</h1>
            <p><strong>Né(e) le: </strong>{{ baby.formatedBirth }}</p>
            <p><strong>Parent : </strong>{{ baby.parent.name }}</p>
            <BabyNannies />
            <BabyComments v-if="baby.comments" />
            <BabyUpdater v-if="isUserParent" />
            <button v-if="isUserParent" @click="deleteBaby">Delete</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import BabyNannies from "../components/baby/BabyNannies";
import BabyComments from "../components/baby/BabyComments";
import BabyUpdater from "../components/baby/BabyUpdater";

export default {
    name: "baby-page",
    components: { BabyNannies, BabyComments, BabyUpdater },
    computed: {
        ...mapState({
            baby: (state) => state.baby.baby,
        }),
        ...mapGetters({
            isUserParent: "isUserParent",
        }),
    },
    beforeMount() {
        if (!this.baby || this.baby.id !== this.$route.params.id) {
            this.$store.commit("baby/setBaby", null);
            try {
                this.$store.dispatch("baby/getBaby", this.$route.params.id);
            } catch (e) {
                this.$router.push({ name: "home" });
            }
        }
    },
    methods: {
        async deleteBaby() {
            try {
                await this.$store.dispatch("baby/deleteBaby", this.baby.id);
                this.$router.push({ name: "home" });
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>
