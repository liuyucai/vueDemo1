<template>
  <div class="tab-nav">
    <el-tabs v-model="editableTabsValue" type="card" closable
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
  </div>
</template>
<style>

</style>
<script>
  export default {
    name: 'tab',
    data() {
        return {
            editableTabsValue: '2',
            editableTabs: [{
                title: 'Tab 1',
                name: '1',
                // content: 'Tab 1 content'
            }, {
                title: 'Tab 2',
                name: '2',
                // content: 'Tab 2 content'
            }],
            tabIndex: 2
        }
    },
    mounted() {
    },
    methods: {
        // addTab(targetName) {
        //       let newTabName = ++this.tabIndex + '';
        //       this.editableTabs.push({
        //           title: 'New Tab',
        //           name: newTabName,
        //           // content: 'New Tab content'=
        //       });
        //       this.editableTabsValue = newTabName;
        // },
        addTab(item) {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: item.menuName,
            // path: item.path,
            name: newTabName,
          });
          // this.editableTabsValue = item.menuName;
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
        },
        openTag(targetName){
          this.$router.push({
            path: '/home/first',
          });
        }
    }
  }
</script>
