<template>
    <div>
        <HeaderBar />
        <div class="container mx-auto px-2 md:px-0">
            <router-view />
        </div>
        <Confirm />
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import HeaderBar from "./components/common/HeaderBar";
import Confirm from "./components/common/Confirm";

export default {
    name: "App",
    components: { HeaderBar, Confirm },
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
