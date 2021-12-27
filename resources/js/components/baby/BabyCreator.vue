<template>
    <div>
        <form>
            <div class="mt-2 flex flex-col md:flex-row gap-4 items-center">
                <label class="grow w-full md:w-auto"
                    >Nom
                    <input type="text" v-model="name" placeholder="Nom" />
                </label>

                <label class="grow w-full md:w-auto"
                    >Date de naissance
                    <input
                        type="date"
                        v-model="birth"
                        :max="new Date().toISOString().slice(0, 16)"
                    />
                </label>
            </div>
            <div class="flex justify-center mt-4">
                <button @click.prevent="createBaby">valider</button>
            </div>
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
