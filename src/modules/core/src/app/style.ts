export const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 7,
  },
  shadowOpacity: 0.41,
  shadowRadius: 9.11,
  elevation: 14,
}

export const dNone = (val: Boolean) => {
  if (val) return { display: 'none' }
}

export const dBlock = (val: Boolean) => {
  if (val) return { display: 'flex' }
}
