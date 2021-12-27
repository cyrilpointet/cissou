<template>
    <div>
        <div class="flex cursor-pointer" @click="toggle">
            <slot name="title"></slot>
            <span class="material-icons rotating" :class="{ active: isOpen }"
                >expand_more</span
            >
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
    name: "cissou-accordion",
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
