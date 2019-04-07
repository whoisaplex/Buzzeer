let debounce = function (func, delay) {
    let timeout = null
    return function () {
        clearTimeout(timeout)
        let args = arguments
        let that = this
        timeout = setTimeout(() => {
            func.apply(that, args)
        }, delay)
    }
}

module.exports = debounce