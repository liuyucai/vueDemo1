<template>
  <div class="menu-wrapper" style="overflow: hidden">
    <template v-for="item in menu">
      <el-menu-item v-if="!item.isParent"
                    :index="item.path"
                    @click="open(item)">
        <i class="el-icon-location"></i>
        <span slot="title">{{item.menuName}}</span>
      </el-menu-item>
      <el-submenu v-else-if="item.isParent"
                  :index="item.id+''">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{item.menuName}}</span>
        </template>
        <sidebar-item :menu="item.child" @selectItemParentMethod="selectItem"></sidebar-item>
      </el-submenu>
    </template>
  </div>
</template>
<script>
  export default {
    name: "sidebarItem",
    data() {
      return {
      };
    },
    props: {
      menu: {
        type: Array
      }
    },
    methods: {
      open(item) {
        this.$emit("selectItemParentMethod",item);
      },
      selectItem(item){
        this.$emit("selectItemParentMethod",item);
      }
    }
  };
</script>
