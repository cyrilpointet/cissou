<template>
    <div>
        <h2 class="subtitle mt-12 mb-4">Mes bébés</h2>
        <ul class="list clickable mb-8">
            <li
                v-for="baby in user.allBabies"
                :key="baby.id"
                @click="goToBaby(baby.id)"
            >
                <p>{{ baby.name }} - {{ baby.formatedBirth }}</p>
            </li>
        </ul>

        <div class="updaterMain">
            <div
                class="flex cursor-pointer"
                @click="creatorOpen = !creatorOpen"
            >
                <h5 class="subtitle grow">Ajouter un Bébé</h5>
                <span
                    class="material-icons rotating"
                    :class="{ active: creatorOpen }"
                >
                    expand_more
                </span>
            </div>
            <div
                class="creatorContent"
                ref="creator"
                :style="{ maxHeight: creatorMaxHeight }"
            >
                <BabyCreator />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import BabyCreator from "../components/baby/BabyCreator";

export default {
    name: "home-page",
    components: { BabyCreator },
    data: () => {
        return {
            creatorOpen: false,
        };
    },
    computed: {
        ...mapState({
            user: (state) => state.user.user,
        }),
        creatorMaxHeight() {
            return this.creatorOpen
                ? this.$refs.creator.scrollHeight + "px"
                : "0px";
        },
    },
    methods: {
        goToBaby(id) {
            this.$router.push({
                name: "baby",
                params: { id: id },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.updaterMain {
    @apply border-y border-gray py-2 mb-8;
}
.creatorContent {
    transition: max-height 0.2s linear;
    overflow: hidden;
}
</style>
