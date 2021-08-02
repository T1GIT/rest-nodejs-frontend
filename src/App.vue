<template>
  <div class="container pt-3" v-cloak>
    <h1>REST API</h1>

    <form class="form-inline mb-3" @submit.prevent="createPost">
      <div class="form-group m-3">
        <label for="title" class="mr-3">Title</label>
        <input type="text" class="form-control" name="title" id="title" v-model="form.title">
      </div>
      <div class="form-group m-3">
        <label for="description" class="mr-3">Description</label>
        <input type="text" class="form-control" name="description" id="description" v-model="form.description">
      </div>
      <button class="btn btn-primary" type="submit" :disabled="!canCreate">Create</button>
    </form>

    <template v-if="posts.length">
      <div class="card mb-3" v-for="post in posts">
        <div class="card-body">
          <div>
            <input class="card-title" v-model="post.title">
            <input class="card-text" v-model="post.description">
          </div>
          <button class="btn btn-primary m-2" @click="updatePost(post._id, post)">Edit</button>
          <button class="btn btn-danger m-2" @click="deletePost(post._id)">Delete</button>
        </div>
      </div>
    </template>
    <p v-else>No posts</p>
  </div>
</template>

<script>

import postsService from './service'

export default {
  name: 'App',
  data() {
    return {
      form: {
        title: '',
        description: ''
      },
      posts: []
    }
  },
  computed: {
    canCreate() {
      return this.form.title.trim() && this.form.description.trim()
    }
  },
  async created() {
    this.posts = await postsService.getAll()
  },
  methods: {
    createPost() {
      const { ...post } = { ...this.form, _id: null }

      this.posts.push(post)

      postsService.add(post)
          .then(postId => post._id = postId)
          .catch(e => this.posts = this.posts.filter(p => p !== post))

      this.form.title = ""
      this.form.description = ""
    },
    updatePost(id, post) {
      postsService.update(id, post)
    },
    deletePost(id) {
      this.posts = this.posts.filter(p => p._id !== id)
      postsService.delete(id)
    }
  }
}
</script>

<style scoped lang="sass">

$body-bg: #000
$body-color: #111

[v-cloak]
  display: none

.form-inline
  display: flex
  flex-direction: row

</style>
