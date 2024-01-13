<template>
  <main>
    <div class="home">
      <section class="hero">
        <div class="hero-text container">
          <h4>Olá!</h4>
          <hr />
          <h2>Bem vindo!<br /></h2>
          <hr />
        </div>
      </section>
      <section>{{ content }}</section>
    </div>
  </main>
</template>

<script>
// import UserService from '../services/user.service'

export default {
  name: 'HomeView',
  data() {
    return {
      content: ''
    }
  },
  mounted() {
    // TODO: Imprementar Segurança
    // UserService.getPublicContent().then(
    //   (response) => {
    //     this.content = response.data
    //   },
    //   (error) => {
    //     this.content =
    //       (error.response && error.response.data && error.response.data.message) ||
    //       error.message ||
    //       error.toString()
    //   }
    // )
  }
}
</script>

<style lang="scss" scoped></style>
