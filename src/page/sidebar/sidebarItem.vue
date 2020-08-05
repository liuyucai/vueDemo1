<template>
  <div class="menu-wrapper">
    <template v-for="item in menu">
      <el-menu-item v-if="!item.isParent"
                    :index="item.id">
        <i class="el-icon-location"></i>
        <span slot="title">{{item.menuName}}</span>
      </el-menu-item>
      <el-submenu v-else-if="item.isParent"
                  :index="item.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.menuName}}</span>
        </template>
        <template v-for="child in item.child">
          <sidebar-item :menu="[child]"></sidebar-item>
        </template>
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
    // ...mapGetters(["roles"]),
    // labelKey() {
    //   return this.props.label || this.config.propsDefault.label;
    // },
    // pathKey() {
    //   return this.props.path || this.config.propsDefault.path;
    // },
    // iconKey() {
    //   return this.props.icon || this.config.propsDefault.icon;
    // },
    // childrenKey() {
    //   return this.props.children || this.config.propsDefault.children;
    // },
    // nowTagValue() {
    //   return this.$router.$avueRouter.getValue(this.$route);
    // }
  },
  methods: {
    // vaildAvtive(item) {
    //   const groupFlag = (item["group"] || []).some(ele =>
    //     this.$route.path.includes(ele)
    //   );
    //   return this.nowTagValue === item[this.pathKey] || groupFlag;
    // },
    // vaildRoles(item) {
    //   item.meta = item.meta || {};
    //   return item.meta.roles ? item.meta.roles.includes(this.roles) : true;
    // },
    // validatenull(val) {
    //   return validatenull(val);
    // },
    // open(item) {
    //   if (this.screen <= 1) this.$store.commit("SET_COLLAPSE");
    //   this.$router.$avueRouter.group = item.group;
    //   this.$router.push({
    //     path: this.$router.$avueRouter.getPath({
    //       name: item[this.labelKey],
    //       src: item[this.pathKey]
    //     }),
    //     query: item.query
    //   }).catch(() => {});
    // }
  }
};
</script>

