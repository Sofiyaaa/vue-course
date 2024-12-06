<template>
  <div class="app"> 
    <h1>Страница с постами</h1>
    <my-input 
      v-model="searchQuery" 
      placeholder="Поиск"
    />
    <div class="app__btns">
      <my-button 
        @click="showDialog"
      >
        Создать пост
      </my-button>
      <my-select 
        v-model="selectedSort" 
        v-bind:options="sortOptions"
      />
    </div>
    <!-- <input v-model.trim="modificatorValue" type="text"> модификаторы v-model -->    
    <my-dialog v-model:show="dialogVisible">
      <post-form 
        @click.stop
        @create="createPost"
      />
    </my-dialog>
    <post-list
      @remove="removePost"
      :posts="searchedPosts"  
      v-if="!isPostsLoadind"   
    /> <!-- Привязываем посты к компоненту через v-bind, они улетят в PostList в качестве пропсов. Короткая запись :posts="posts" -->
    <div v-else>Идет загрузка...</div>
    <!-- КНОПКИ ДЛЯ ПЕРЕКЛЮЧЕНИЯ СТРАНИЦ -->
    <div class="page__wrapper">
      <div 
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          'current-page': this.page === pageNumber
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';
import axios from 'axios'

  export default {
    components: {
      PostForm, 
      PostList,
    },
    data() {
      return {
        /* добавила массив для того чтоб можно было сделать пагинацию.
        вроде он не подгружался, данные с сервера не помню подгружались 
        вместе с ним или нет */
        posts: [
          { id: 101, name: "Victor", year: 1990 },
          { id: 102, name: "Bob", year: 1985 },
          { id: 103, name: "Charlie", year: 1992 },
          { id: 104, name: "David", year: 1988 },
          { id: 105, name: "Tina", year: 1995 },
          { id: 106, name: "Frank", year: 1991 },
          { id: 107, name: "Grace", year: 1987 },
          { id: 108, name: "Hannah", year: 1993 },
          { id: 109, name: "Bob", year: 1986 },
          { id: 110, name: "Jack", year: 1994 },
          { id: 111, name: "Alice", year: 1989 },
          { id: 112, name: "Leo", year: 1996 },
          { id: 113, name: "Mona", year: 1990 },
          { id: 114, name: "Nina", year: 1984 },
          { id: 115, name: "Oscar", year: 1992 },
          { id: 116, name: "Paul", year: 1985 },
          { id: 117, name: "Quinn", year: 1993 },
          { id: 118, name: "Rita", year: 1987 },
          { id: 119, name: "Sam", year: 1991 },
          { id: 120, name: "Eva", year: 1994 },
          { id: 121, name: "Ursula", year: 1988 },
          { id: 122, name: "Alice", year: 1995 },
          { id: 123, name: "Wendy", year: 1986 },
          { id: 124, name: "Xander", year: 1990 },
          { id: 125, name: "Yara", year: 1992 }
        ],
        dialogVisible: false,
        modificatorValue: '',
        isPostsLoadind: false,
        selectedSort: '',
        sortOptions: [
          {value: 'title', name: 'По названию'},
          {value: 'year', name: 'По году'}
        ],
        searchQuery: '',
        page: 1,
        limit: 7,
        totalPages: 0,
      }
    }, 
    methods: {
      createPost(post) {
        this.posts.push(post);
        this.dialogVisible = false
      },  
      inputValue(event) {
        this.title = event.target.value;
      },
      removePost(post) {
        // в массив попадают те посты, ид кот не = посту, кот мы передаем в парам ф-ии
        this.posts = this.posts.filter(p => p.id !== post.id)
      },
      showDialog() {
        this.dialogVisible = true
      },   
      // МЕНЯЮ НОМЕР И ПОДГРУЖАЮ ПОСТЫ
      changePage(pageNumber) {
        this.page = pageNumber
        this.fetchPosts()
      },
      async fetchPosts() {
        try {
          this.isPostsLoadind = true
          const response = await axios.get('https://reqres.in/api/posts', {
            params: {
              _page: this.page,
              _limit: this.limit,
            }
          })
          // this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
          // ТУТ СЧИТАЮ КОЛ-ВО СТРАНИЦ 
          this.totalPages = Math.ceil(this.posts.length / this.limit)
          console.log(response)
          this.posts.push(response.data.data)
        } catch(e) {
            alert('Error')
        } finally {
            this.isPostsLoadind = false
        }
      }, 
    }, 
    mounted() {
      this.fetchPosts()
    }, 

    watch: {
      selectedSort(newValue) {
          switch (newValue) {
          case 'title':
            this.posts.sort((post1, post2) =>
            post1.name?.localeCompare(post2.name));
          break;
          case 'year':
            console.log('name');
            this.posts.sort((post1, post2) => post1.year - post2.year)
          break;
        }
      }
    },

    computed: {
      searchedPosts() {
        return this.posts.filter(p => p.name?.toLowerCase().includes(this.searchQuery.toLowerCase()) || p.year == this.searchQuery)
      }
    }

  }
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 15px;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}
</style>

// Single file component
