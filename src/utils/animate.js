export function addAnimate(ref, animName, timeout) {
    setTimeout(() => {
        ref.classList.add('animated')
        ref.classList.add(animName)
    }, timeout || 0)
    ref.addEventListener('webkitAnimationEnd', () => {
        ref.classList.remove('animated')
        ref.classList.remove(animName)
    })
}
