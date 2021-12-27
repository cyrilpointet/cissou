<template>
    <div>
        <p class="text-center">Autorisations</p>
        <table>
            <thead>
                <tr>
                    <td></td>
                    <td>
                        <span class="material-icons"> visibility_off </span>
                    </td>
                    <td>
                        <span class="material-icons">visibility</span>
                    </td>
                    <td>
                        <span class="material-icons">edit</span>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Commentaires</td>
                    <td>
                        <input type="radio" value="0" v-model="commentsRole" />
                    </td>
                    <td>
                        <input type="radio" value="1" v-model="commentsRole" />
                    </td>
                    <td>
                        <input type="radio" value="2" v-model="commentsRole" />
                    </td>
                </tr>
            </tbody>
        </table>

        <button @click="updateNanny" :disabled="ajaxPending">valider</button>
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
            ajaxPending: false,
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
            this.ajaxPending = true;
            try {
                await this.$store.dispatch("baby/updateNanny", {
                    babyId: this.baby.id,
                    nannyId: this.nanny.id,
                    commentsRole: this.commentsRole,
                });
                this.$emit("done");
            } catch (e) {
                console.log(e);
            }
            this.ajaxPending = false;
            console.log("updated");
        },
    },
};
</script>

<style lang="scss" scoped>
td {
    @apply p-2;
    text-align: center;
    vertical-align: center;
}
</style>
