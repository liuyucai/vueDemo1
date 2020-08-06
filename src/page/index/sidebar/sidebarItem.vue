<template>
  <div class="menu-wrapper">
    <template v-for="item in menu">
      <el-menu-item v-if="!item.isParent"
                    :index="item.path">
        <i class="el-icon-location"></i>
        <span slot="title">{{item.menuName}}</span>
      </el-menu-item>
      <el-submenu v-else-if="item.isParent"
                  :index="item.id">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{item.menuName}}</span>
        </template>
        <!--        <template v-for="child in item.child">-->
        <!--          <sidebar-item :menu="[child]"></sidebar-item>-->
        <!--        </template>-->
        <sidebar-item :menu="item.child"></sidebar-item>
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
      },
      screen: {
        type: Number
      },
      first: {
        type: Boolean,
        default: false
      },
      props: {
        type: Object,
        default: () => {
          return {};
        }
      },
      collapse: {
        type: Boolean
      }
    },
    created() {},
    mounted() {},
    computed: {
    },
    methods: {
    }
  };
</script>
