<template>
    <div>
        <div class="flex items-center gap-4">
            <slot name="title"></slot>
            <button icon v-if="editable" @click="toggle">
                <span class="material-icons">edit</span>
            </button>
            <button icon v-if="editable" @click="$emit('delete')">
                <span class="material-icons">delete</span>
            </button>
        </div>
        <div
            class="accordionBody"
            ref="accordionBody"
            :style="{ maxHeight: accordionBodyMaxHeight }"
        >
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "editable-accordion",
    props: ["editable"],
    data: () => {
        return {
            isOpen: false,
        };
    },
    computed: {
        accordionBodyMaxHeight() {
            return this.isOpen
                ? this.$refs.accordionBody.scrollHeight + "px"
                : "0px";
        },
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
        },
    },
};
</script>

<style lang="scss" scoped>
.rotating {
    transition: transform 0.2s linear;
    transform-origin: center;
    transform: rotate(0);
}
.rotating.active {
    transform: rotate(180deg);
}
.accordionBody {
    transition: max-height 0.2s linear;
    overflow: hidden;
}
</style>
