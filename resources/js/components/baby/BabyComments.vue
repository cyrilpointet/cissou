<template>
    <div>
        <h4 class="subtitle">Comments</h4>
        <ul class="list">
            <li v-for="comment in baby.comments" :key="comment.id">
                <CommentItem :comment="comment" />
            </li>
            <li v-if="baby.comments.length < 1">Pas de commentaire</li>

            <li v-if="isUserParent || userRoles.comments.write">
                <Accordion ref="accordion">
                    <template v-slot:title>
                        <strong class="grow">Ajouter un commentaire</strong>
                    </template>
                    <template v-slot:body>
                        <CommentCreator @done="$refs.accordion.toggle()" />
                    </template>
                </Accordion>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CommentCreator from "../comment/CommentCreator";
import CommentItem from "../comment/CommentItem";
import Accordion from "../common/Accordion";

export default {
    name: "baby-comments",
    components: { CommentCreator, CommentItem, Accordion },
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
