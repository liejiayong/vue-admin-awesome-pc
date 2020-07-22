<template>
  <div id="app">
    <vab-quill v-model="form.content" :min-height="400"></vab-quill>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      form: {
        title: "",
        module: "",
        content: "",
      },
    };
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
