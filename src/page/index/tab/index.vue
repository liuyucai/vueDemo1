<template>
  <div class="tab-nav">
    <div class="tab-nav-main">
      <div class="tab-nav-box">
          <el-tabs v-model="editableTabsValue" type="card"
                   :closable="tagLen!==1"
                   @tab-remove="removeTab"
                   @tab-click="openTag">
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              {{item.content}}
            </el-tab-pane>
          </el-tabs>
          <el-dropdown class="avue-tags__menu" size="mini">
            <el-button type="primary" class="el-button--mini">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>关闭其它</el-dropdown-item>
              <el-dropdown-item>关闭全部</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
    </div>
  </div>
</template>
<style>
  .tab-nav{
    background: white;
  }
  .tab-nav-main{
    padding: 0 10px;
  }
  .tab-nav-box{
    padding-right: 110px;
    position: relative;
  }
  .avue-tags__menu {
    position: absolute!important;
    top: 4px;
    right: 0;
    padding: 1px 0 0 15px;
  }
  .el-tabs__header{
    margin-bottom: 0;
  }
  .el-tabs--card>.el-tabs__header {
    border: none;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__nav {
    /*border: 1px solid #E4E7ED;*/
    border: none;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item {
    /*border-bottom: 1px solid transparent;*/
    border-left: none;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    color: #2BC2E8;
    border-bottom: 2px solid #2BC2E8;
  }

  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

</style>
<script>
  export default {
      name: 'tab',
      data() {
          return {
              editableTabsValue: '/home',
              editableTabs: [{
                  title: '首页',
                  name: '/home',
              }],
              tabIndex: 1,
          }
      },
      computed: {
          tagLen() {
              return this.editableTabs.length || 0;
          }
      },
      mounted() {
      },
      methods: {
          openMenu(item){
              for(var i = 0;i<this.editableTabs.length;i++){
                  if(this.editableTabs[i].name == item.path){
                      this.editableTabsValue = this.editableTabs[i].name;
                      return true;
                      break;
                  }
              }
              this.$options.methods.addTab(item,this);
          },
          addTab(item,that) {
              that.editableTabs.push({
                  title: item.menuName,
                  name: item.path,
              });
              that.editableTabsValue = item.path;
          },
          removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
                this.$router.push({
                    path: this.editableTabsValue,
                });
          },
          openTag(targetName){
            this.$router.push({
                path: targetName.name,
            });
          }
      }
  }
</script>
