<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>
        <my-input 
            v-model="post.name"
            placeholder="Название"
        />
        <!-- лучше исп. такой способ ($event) вместо ф-ии -->
        <my-input 
            v-model="post.year"    
            placeholder="Год"
        />
        <my-button 
            style="margin-top: 15px" 
            @click="createPost"
            >Создать пост
        </my-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            post: {
                id: '',
                name: '',
                year: '',
            }
        }
    },
    methods: {
        createPost(event) {
            this.post.id = Date.now(),
            this.$emit('create', this.post);
            this.post = {
                name: '',
                year: '',
            }
        }
    }, 
    // Глубокое отслеживание объекта, чтобы следить за вложенными в объект полями
    // watch: {
    //     post: {
    //         handler(newVal) {
    //             console.log()
    //         },
    //         deep: true,
    //     }
    // }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>