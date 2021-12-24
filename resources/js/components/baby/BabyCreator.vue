<template>
    <div>
        <h3 class="subtitle">Ajouter Baby</h3>
        <form>
            <label
                >Nom
                <input type="text" v-model="name" placeholder="Nom" />
            </label>

            <label
                >Date de naissance
                <input
                    type="datetime-local"
                    v-model="birth"
                    :max="new Date().toISOString().slice(0, 16)"
                />
            </label>

            <button @click.prevent="createBaby">Valider</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "baby-creator",
    data: () => {
        return {
            name: "",
            birth: new Date().toISOString().slice(0, 16),
        };
    },
    methods: {
        async createBaby() {
            try {
                const newBaby = await this.$store.dispatch("baby/createBaby", {
                    name: this.name,
                    birth: this.birth,
                });
                this.$router.push({
                    name: "baby",
                    params: { id: newBaby.id },
                });
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>
