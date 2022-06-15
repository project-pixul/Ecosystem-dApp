const formatNumber = (num: Number) => {
    return num.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export {formatNumber}