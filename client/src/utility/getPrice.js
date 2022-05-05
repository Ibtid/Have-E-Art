const getPrice= (price) => {
    price = Number(price)
    const eartPrice = price *0.85
    const creatorFee = price * 0.10
    const platformFee = price * 0.05
    return {eartPrice, creatorFee, platformFee}
}

export default getPrice