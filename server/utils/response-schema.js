module.exports = {

    ok(data) {
        return {
            ok:       true,
            response: data
        }
    },

    error(code, fields = {}) {
        return {
            ok: false,
            error: {
                code,
                ...fields
            }
        }
    }

}
