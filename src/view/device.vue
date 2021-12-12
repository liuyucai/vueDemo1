<template>
  <div style="margin: 10px">
    <!--  {{page}}-->
    <avue-crud
      :data="data"
      :option="option"
      :page.sync="page"
      @search-change="searchChange"
      @on-load="onLoad">

      <template slot="searchMenu">
        <el-button size="small">自定义按钮</el-button>
      </template>

      <template slot-scope="{type,size}" slot="menu">
        <el-button icon="el-icon-check" :size="size" :type="type">自定义菜单按钮</el-button>
      </template>

    </avue-crud>

  </div>
</template>


<script>
    export default {
        data() {
            return {
                page: {
                    pageSize: 20,
                    pagerCount:5
                },
                data: [],
                option: {
                    card:true,  //开启卡片模式
                    align: 'center',
                    menuAlign: 'center',
                    menu:true,  //设置行操作栏，删除/修改
                    searchMenuSpan:8,  //操作按钮在一行上显示
                    column: [
                        {
                            label: '姓名',
                            prop: 'name',
                            width:500,
                            search:true,  //显示该项的搜索框
                        },
                        {
                            label: '年龄',
                            prop: 'age',
                            width:500,
                            search:true,  //显示该项的搜索框
                        },
                        {
                            label: '生日',
                            prop: 'dateOfBirth',
                            search:true,  //显示该项的搜索框
                            fixed:'right', //设置列固定 true/left/right
                        },
                        {
                            label: '性别',
                            prop: 'sex',
                            search:true,
                            fixed:'right', //设置列固定 true/left/right
                        }
                    ]
                }
            }
        },
        methods: {
            onLoad(page) {
                this.$message.success('分页信息:' + JSON.stringify(page))
                this.page.total = 40
                //模拟分页
                if (this.page.currentPage === 1) {
                    this.data = [
                        {
                            id:1,
                            name: '张三',
                            age:'15',
                            dateOfBirth:"23",
                            sex: '男'
                        },{
                            id:2,
                            name: '李四',
                            age:'15',
                            dateOfBirth:"23",
                            sex: '女'
                        }
                    ]
                } else if (this.page.currentPage == 2) {
                    this.data = [
                        {
                            id:3,
                            name: '王五',
                            sex: '女'
                        },{
                            id:4,
                            name: '赵六',
                            sex: '女'
                        }
                    ]
                }
            },
            searchChange(params,done) {
                done();
                this.$message.success(JSON.stringify(params));
            }
        }
    }
</script>

