export const btn1 = state => {
  if (state.count === 0) {
    state.count = 0
  } else state.count = state.count - 1
}
export const btn2 = state => {
  state.count = state.count + 1
}
