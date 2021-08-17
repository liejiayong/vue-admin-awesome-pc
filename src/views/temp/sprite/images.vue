<template>
  <div>
    <el-upload http-request="onRequest" class="upload-demo" drag action="/upload" multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  methods: {
    onRequest() {
      console.lg('uploader request');
    },
  },
};
</script>

<style></style>
