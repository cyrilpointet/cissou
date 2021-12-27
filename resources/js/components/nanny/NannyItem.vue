<template>
    <div class="main">
        <div class="flex items-center gap-4">
            <p class="grow">
                {{ nanny.name }}
            </p>
            <button icon v-if="isUserParent" @click="toggleAccordion()">
                <span class="material-icons">edit</span>
            </button>
            <button icon v-if="isUserParent" @click="removeNanny(nanny.id)">
                <span class="material-icons">delete</span>
            </button>
        </div>
        <div class="panel" ref="panel" :style="{ maxHeight: panelMaxHeight }">
            <NannyUpdater
                @done="toggleAccordion"
                v-if="isUserParent"
                :nanny="nanny"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import NannyUpdater from "./NannyUpdater";

export default {
    name: "nanny-item",
    props: ["nanny"],
    components: { NannyUpdater },
    data: () => {
        return {
            panelMaxHeight: 0,
        };
    },
    computed: {
        ...mapState({
            baby: (state) => state.baby.baby,
            user: (state) => state.user.user,
        }),
        ...mapGetters({
            isUserParent: "isUserParent",
        }),
    },
    methods: {
        toggleAccordion() {
            if (this.panelMaxHeight !== 0) {
                this.panelMaxHeight = 0;
            } else {
                this.panelMaxHeight = this.$refs.panel.scrollHeight + "px";
            }
        },
        async removeNanny() {
            await this.$store.dispatch("baby/removeNanny", {
                babyId: this.baby.id,
                nannyId: this.nanny.id,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.main {
    transition: 0.4s;
}
.panel {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
}
</style>
