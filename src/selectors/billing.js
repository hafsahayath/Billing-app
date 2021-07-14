export const findProduct = (id, array) => {
    return array.filter(ele=>{
      return ele._id === id
    })
} 


export const dateFormatter = (date) => {
    return date.slice(0,10).split('-').reverse().join('-')
}
