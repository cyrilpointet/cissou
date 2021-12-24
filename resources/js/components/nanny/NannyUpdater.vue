<template>
    <div>
        <label radio
            >zero
            <input type="radio" value="0" v-model="commentsRole" />
        </label>
        <label radio
            >Un
            <input type="radio" id="one" value="1" v-model="commentsRole" />
        </label>
        <label radio
            >Deux
            <input type="radio" id="two" value="2" v-model="commentsRole" />
        </label>
        <button @click="updateNanny">valider</button>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "nanny-updater",
    props: ["nanny"],
    data: () => {
        return {
            commentsRole: 0,
        };
    },
    computed: {
        ...mapState({
            baby: (state) => state.baby.baby,
        }),
    },
    beforeMount() {
        this.commentsRole = this.nanny.commentsRole;
    },
    methods: {
        async updateNanny() {
            await this.$store.dispatch("baby/updateNanny", {
                babyId: this.baby.id,
                nannyId: this.nanny.id,
                commentsRole: this.commentsRole,
            });
            console.log("updated");
        },
    },
};
</script>
