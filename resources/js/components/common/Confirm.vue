<template>
    <div v-if="show" class="background" @click="show = false">
        <div class="card">
            <div class="head">
                <span class="grow">{{ title }}</span>
                <span class="material-icons" @click="show = false">close</span>
            </div>
            <div class="p-4">{{ content }}</div>
            <div class="p-2 flex">
                <button @click="show = false">Annuler</button>
                <span class="grow"></span>
                <button @click="action">Confirmer</button>
            </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from "../../services/EventBus";

export default {
    name: "confirm-modal",
    data: () => {
        return {
            show: false,
            title: "title",
            content: "Lorem ipsum dolor sit amet, consectetur",
            action: () => {
                console.log("coucou");
            },
        };
    },
    created() {
        EventBus.$on("openConfirmModal", (event) => {
            this.title = event.title;
            this.content = event.content;
            this.action = event.action;
            this.show = true;
        });
    },
};
</script>

<style lang="scss" scoped>
.background {
    @apply fixed inset-0 flex items-center justify-center;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
}
.card {
    @apply bg-white max-w-full;
    width: 480px;
    animation-name: zoomIn;
    animation-duration: 0.2s;
}
.head {
    @apply p-2 text-xl font-bold uppercase flex items-center bg-lightgray;
    .material-icons {
        cursor: pointer;
    }
}
</style>
