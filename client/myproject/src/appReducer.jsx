
export default function appReducer(store = {}, action) {

    const { entity, payload } = action;

    switch (action.type) {

        case 'USER':
            console.log(payload)
            return {
                user: payload
            };

        case 'LOAD':
            console.log(payload)
            return {
                ...store,
                ...payload
            };

        case 'ADD':
            return {
                ...store,
                [entity]: [...store[entity], payload]
            };

        case 'UPDATE':
            const entityAfterUpdate = store[entity].map((item) => item._id === payload._id ? payload : item);
            return {
                ...store,
                [entity]: entityAfterUpdate
            };

        case 'DELETE':
            const entityAfterDlt = store[entity].filter((item) => item._id !== payload._id)
            return {
                ...store,
                [entity]: entityAfterDlt
            };

        default:
            return store;

    }
}
