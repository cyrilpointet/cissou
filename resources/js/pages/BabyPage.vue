<template>
    <div>
        <div v-if="baby">
            <h1 class="title mt-8">{{ baby.name }}</h1>
            <p><strong>Né(e) le: </strong>{{ baby.formatedBirth }}</p>
            <p class="mb-8"><strong>Parent : </strong>{{ baby.parent.name }}</p>
            <BabyNannies class="mb-8" />
            <BabyComments v-if="isUserParent || userRoles.comments.read" />
            <BabyUpdater v-if="isUserParent" />
            <UserFinder v-if="isUserParent" @userSelected="addNanny" />
            <h5 v-if="isUserParent">Delete</h5>
            <button v-if="isUserParent" @click="deleteBaby">Delete</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import BabyNannies from "../components/baby/BabyNannies";
import BabyComments from "../components/baby/BabyComments";
import BabyUpdater from "../components/baby/BabyUpdater";
import UserFinder from "../components/user/UserFinder";

export default {
    name: "baby-page",
    components: { BabyNannies, BabyComments, BabyUpdater, UserFinder },
    computed: {
        ...mapState({
            baby: (state) => state.baby.baby,
        }),
        ...mapGetters({
            isUserParent: "isUserParent",
            userRoles: "userRoles",
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
        async addNanny(userId) {
            try {
                await this.$store.dispatch("baby/addNanny", {
                    babyId: this.baby.id,
                    userId: userId,
                });
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>
