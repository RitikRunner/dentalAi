export async function startRouterNode(state) {

    if (state.domainValidated) {

        return {

            ...state,

            next: "intentClassifier",

        };

    }

    return {

        ...state,

        next: "domainGuard",

    };

}