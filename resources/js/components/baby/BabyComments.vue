<template>
    <div>
        <h4>Comments</h4>
        <p v-for="comment in baby.comments" :key="comment.id">
            {{ comment.text }}
        </p>
        <div v-if="baby.comments.length < 1">
            <p>Pas de commentaire</p>
        </div>
        <div>
            <p>
                Peut lire:
                {{ isUserParent || userRoles.comments.read ? "oui" : "non" }}
            </p>
            <p>
                Peut écrire:
                {{ isUserParent || userRoles.comments.write ? "oui" : "non" }}
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    name: "baby-comments",
    computed: {
        ...mapState({
            baby: (state) => state.baby.baby,
        }),
        ...mapGetters({
            isUserParent: "isUserParent",
            userRoles: "userRoles",
        }),
    },
};
</script>
