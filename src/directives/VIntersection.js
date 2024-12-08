export default {
    mounted(el, binding) {
        console.log(el, binding)
/* после монтирования сразу начинаем следить за блоком observed, чтобы зарегестрировать колбек ф-ю 
кот выполнится когда мы пересекли какой-то элемент  */ 
        const options = {
            root: document.querySelector("#scrollArea"), // область видимости браузера (по умолчанию)
            rootMargin: "0px",
            threshold: 1.0,
        };
/* callback - та ф-я кот отработает когда мы пересекли необходимый элемент
observer - создаваемый на основании этой ф-ии объект */
        const callback = (entries, observer) => {
            if (entries[0].isIntersecting) {
            binding.value()
            // console.log('entries: ', entries) изнач-но массив сост-ий из 1 объекта, таргетом этого боъекта явл див за кот мы наблюдаем
            } 
        }
        const observer = new IntersectionObserver(callback, options);
/* observer - наблюдает за всей стр, в парам указ за каким эл надо наблюдать  */
        observer.observe(this.el)
    },
}