<template>
    <div>
        <HeaderBar />
        <div class="container mx-auto">
            <router-view />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import HeaderBar from "./components/common/HeaderBar";

export default {
    name: "App",
    components: { HeaderBar },
    computed: {
        ...mapState({
            user: (state) => state.user.user,
        }),
        ...mapGetters({
            isLogged: "user/isLogged",
        }),
    },
    data: () => {
        return {};
    },
};
</script>
