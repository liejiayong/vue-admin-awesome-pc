<template>
  <el-sub-menu :index="index">
    <template #title>
      <el-icon>
        <component v-if="data?.meta?.elIcon" :is="data.meta.elIcon"></component>
        <svgicon v-else :name="data?.meta?.icon"></svgicon>
        <svgicon v-else :name="data?.meta?.icon"></svgicon>
      </el-icon>
      <span>{{ data?.meta?.title }}</span>
    </template>
    <template v-for="(m1, i1) in data.children" :key="i1">
      <!-- 子菜单 -->
      <template v-if="m1.children && m1.children.length">
        <SubMenuTemplate :data="m1" :index="`${index}-${i1}`"></SubMenuTemplate>
      </template>
      <template v-else>
        <template v-if="m1?.meta?.groupName">
          <el-menu-item-group>
            <template #title>
              <span>{{ m1?.meta?.groupName }}</span>
            </template>
            <el-menu-item :index="`${index}-${i1}`">{{ m1?.meta?.title }}</el-menu-item>
          </el-menu-item-group>
        </template>
        <template v-else>
          <el-menu-item :index="`${index}-${i1}`">{{ m1?.meta?.title }}</el-menu-item>
        </template>
      </template>
    </template>
  </el-sub-menu>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import svgicon from "@/components/svg-icon.vue";

export default defineComponent({
  name: "SubMenuTemplate",
  components: { svgicon },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    index: { type: String, default: "" },
  },
});
</script>
<style lang="scss" scoped></style>
