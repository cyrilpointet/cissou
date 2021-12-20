<template>
    <div>
        <h1>Baby</h1>
        <div v-if="baby">
            <p>Nom: {{ baby.name }}</p>
            <p>Né(e) le: {{ baby.formatedBrith }}</p>
            <div>
                <h4>Parent</h4>
                <p>{{ baby.parent.name }}</p>
                <p v-if="isUserParent">Hey, he's yours !</p>
            </div>
            <BabyNannies />
            <BabyComments v-if="baby.comments" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import BabyNannies from "../components/baby/BabyNannies";
import BabyComments from "../components/baby/BabyComments";

export default {
    name: "baby-page",
    components: { BabyNannies, BabyComments },
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
};
</script>
