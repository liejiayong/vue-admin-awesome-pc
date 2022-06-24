<template>
  <div v-if="data.length">
    <water-fall gap="10px" width="250px" class="container" :data="data" :delay="true">
      <template #default="item">
        <div class="card">
          <img class="img" :src="item.src" @click="preview(item.src, $event)" />
          <p>{{ item.src }}</p>
        </div>
      </template>
    </water-fall>

    <button class="halo-btn halo-btn-primary" @click.stop.prevent="loadMore">加载更多</button>
  </div>
</template>

<script>
import WaterFall from 'kuan-vue-waterfall';
const imgs = [
  'https://cdn.stocksnap.io/img-thumbs/960w/child-baby_CVWOE7B8EK.jpg',
  'https://cdn.stocksnap.io/img-thumbs/280h/flower-drops_IZPGMZWSP0.jpg',
  'https://cdn.stocksnap.io/img-thumbs/280h/tree-branch_1OMV3VKGUX.jpg',
  'https://cdn.stocksnap.io/img-thumbs/280h/ZUW3YNAWAQ.jpg',
  'https://cdn.stocksnap.io/img-thumbs/960w/child-baby_CVWOE7B8EK.jpg',
  'https://cdn.stocksnap.io/img-thumbs/280h/flower-drops_IZPGMZWSP0.jpg',
  'https://cdn.stocksnap.io/img-thumbs/280h/tree-branch_1OMV3VKGUX.jpg',
  'https://cdn.stocksnap.io/img-thumbs/280h/ZUW3YNAWAQ.jpg',
  'https://cdn.stocksnap.io/img-thumbs/960w/child-baby_CVWOE7B8EK.jpg',
  'https://cdn.stocksnap.io/img-thumbs/280h/flower-drops_IZPGMZWSP0.jpg',
  'https://cdn.stocksnap.io/img-thumbs/280h/tree-branch_1OMV3VKGUX.jpg',
  'https://cdn.stocksnap.io/img-thumbs/280h/ZUW3YNAWAQ.jpg',
];
let icount = 0;
export default {
  components: {
    WaterFall,
  },
  data() {
    return {
      payload: {
        page: 1,
        size: 18,
      },
      total: 0,
      data: [],
    };
  },
  computed: {
    hasMore() {
      const { page, size } = this.payload;
      return page * size < this.total;
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    preview(url, e) {
      const { width, height } = e.target;
    },
    async fetchData() {
      const { page, size } = this.payload;
      const prev = (page - 1) * size;
      const images = [...imgs].map((key) => ({
        key: icount++,
        src: key,
      }));
      console.log(images);
      this.total = 500;
      this.data = [...this.data, ...images];
    },
    loadMore() {
      if (this.hasMore) {
        this.payload.page += 1;
        this.fetchData();
      }
    },
  },
};
</script>

<style>
body {
  background-color: #f2f3f8;
}

.container {
  min-height: 90vh;
}

.card {
  padding: 10px;
  background-color: white;
  border-radius: 3px;
  color: #666;
  line-height: 1.5;
  word-break: break-all;
}
.card .img {
  width: 100%;
  margin-bottom: 5px;
  cursor: pointer;
}
.halo-btn {
  margin: 100px auto;
  display: block;
}
</style>
