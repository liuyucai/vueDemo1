<template>
  <div class="view-body">
    <!--    <h1>first</h1>-->
    <div class="view-container">
      <el-row>
        <el-col :span="5" class="view-main-leftTree">
          <div class="view-main-leftTree-filter">
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="orgFilterText">
            </el-input>
          </div>
          <el-tree
            class="filter-tree"
            :data="orgTreeData"
            :props="defaultOrgProps"
            default-expand-all
            :filter-node-method="orgFilterNode"
            ref="tree">
          </el-tree>
        </el-col>
        <el-col :span="19">
          <div class="view-main">
            <div class="query-container" v-if="queryContainerState">
              <el-form :inline="true" :model="userForm" ref="userForm" label-position="right" label-width="100px" size="small" class="demo-form-inline">
                <el-row>
                  <el-col :xs="24" :sm="12" :md="8">
                    <el-form-item label="角色名" prop="roleName">
                      <el-input v-model="userForm.role" placeholder="角色名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="8">
                    <el-form-item >
                      <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                      <el-button icon="el-icon-delete" @click="resetForm('userForm')">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <el-row class="operation-dev">
              <div style="float: left">
                <el-button type="primary" icon="el-icon-plus" size="small" @click="dialogFormVisible = true">新增</el-button>
              </div>
              <div style="float: right">
                <el-button icon="el-icon-s-operation" circle size="small" @click="drawer = true"></el-button>
                <el-button icon="el-icon-search" circle size="small" @click="closeQueryContainer"></el-button>
              </div>
            </el-row>
            <div class="table-container">
              <template>
                <el-table
                  :data="tableData"
                  border
                  @sort-change="sortChange"
                  @filter-change="fnFilterChangeInit"
                  style="width: 100%;text-align: center">
                  <el-table-column
                    fixed
                    type="index"
                    label="序号"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    v-if="colData[0].istrue"
                    prop="roleName"
                    label="角色名称"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    v-if="colData[1].istrue"
                    prop="roleCode"
                    label="角色编码"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    v-if="colData[2].istrue"
                    prop="roleStatus"
                    label="角色分类"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    v-if="colData[3].istrue"
                    prop="createTime"
                    sortable="custom"
                    label="创建时间"
                    width="250">
                  </el-table-column>
                  <el-table-column
                    v-if="colData[4].istrue"
                    prop="state"
                    label="状态"
                    :filters="state"
                    :filter-method="filterTag">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    width="250"
                    label="操作">
                    <template slot-scope="scope">
                      <el-button @click="handleClick(scope.row)" type="text" size="small" icon="el-icon-view">查看</el-button>
                      <el-button type="text" size="small" icon="el-icon-edit">编辑</el-button>
                      <el-button type="text" size="small" icon="el-icon-delete">删除</el-button>
                      <el-button type="text" size="small" icon="el-icon-plus">权限</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                background
                :total="400">
              </el-pagination>
            </div>
            <el-drawer
              title="列显隐"
              size="50%"
              :visible.sync="drawer"
              :direction="direction"
              :before-close="handleClose">
              <template>
                <el-transfer
                  @change="transferCol"
                  :titles="[ '显示','隐藏']"
                  v-model="generateValue"
                  :data="generateData">
                </el-transfer>
              </template>
            </el-drawer>
          </div>
        </el-col>
      </el-row>
      <!--      弹出框-->
      <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
        <el-form :model="createUserForm">
          <el-form-item label="用户名" :label-width="formLabelWidth" required>
            <el-input v-model="createUserForm.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" required>
            <el-input v-model="createUserForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户角色" :label-width="formLabelWidth" required>
            <el-select
              v-model="createUserForm.role"
              @visible-change="closeSelect"
              placeholder="请选择用户角色">
              <el-option
                :key="createUserForm.roleKey"
                :label="createUserForm.labelRole"
                :value="createUserForm.role"
                style="height: auto"
                class="role-select-option">
                <div class="filter-div">
                  <!--                  下面这个input点击要@click.stop.native阻止冒泡事件，否则触发el-option点击，关闭选项框-->
                  <el-input
                    placeholder="输入关键字进行过滤"
                    @click.stop.native="stopBubbing"
                    v-model="filterText">
                  </el-input>
                </div>
                <el-tree class="role-tree filter-tree"
                         ref="tree"
                         :data="roleTreeData"
                         show-checkbox
                         node-key="id"
                         :check-strictly="true"
                         :props="defaultProps"
                         :filter-node-method="filterNode"
                         @check="selectRole"
                         @node-click="selectRole">
                </el-tree>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu-item,.el-submenu__title{
    /*text-align: left;*/
  }
  .view-body{
    margin: 10px;
    background: white;
    border-radius: 4px;
    overflow: hidden;
  }
  .view-container{
    padding: 24px;
  }
  /*.view-main{*/
  /*  border-bottom: 1px solid #f0f2f5;*/
  /*}*/
  /*设置查询输入框宽度*/
  .query-container .el-form .el-input{
    width: 150px;
  }
  /*设置机构数样式*/
  .view-main-leftTree-filter{
    margin-bottom: 20px;
  }
  .view-main-leftTree .el-input{
    font-size: 13px;
  }
  .view-main-leftTree .el-input__inner{
    font-size: 13px;
    height: 32px;
    line-height: 32px;
  }
  .el-table td, .el-table th {
    text-align: center;
  }
  .el-table tr th{
    background-color: #fafafa;
  }
  .el-pagination{
    padding-top: 15px;
    padding-bottom: 10px;
    text-align: right;
  }
  .operation-dev{
    padding: 0 10px 10px 0;
  }
  .operation-dev .el-button+.el-button {
    margin-left: 5px;
  }
  /*设置el-drawer__header打开时标题没有蓝色边框*/
  .el-drawer__header :focus{
    outline:none;
  }
  /*设置eTransfer 穿梭框样式*/
  .el-drawer .el-button+.el-button {
    margin-left: 0;
  }
  .el-drawer__body .el-transfer{
    padding: 0 20px;
  }
  .el-drawer__body .el-transfer .el-transfer-panel{
    width: 40%;
    height: 100%;
  }
  .el-drawer__body .el-transfer .el-transfer__buttons{
    width: 20%;
    padding: 0;
  }
  .el-drawer__body .el-transfer .el-transfer__buttons button{
    display: block;
    margin: 0 auto;
  }
  .el-drawer__body .el-transfer .el-transfer__button:first-child {
    margin-bottom: 10px;
  }
  .el-drawer__body .el-transfer{
    height: 96%;
  }

  /*弹出框select样式*/
  .el-dialog .el-select{
    width: 100%;
  }

  /*.el-select-dropdown .el-scrollbar .el-scrollbar__bar.is-vertical {*/
  /*  opacity: 1;*/
  /*}*/
  .role-select-option{
    padding-right: 0px;
    padding-left: 0px;
  }
  .role-tree {
    min-height: 120px;
    max-height: 150px;
    overflow-y: scroll;
  }

  /*.role-tree .el-tree-node .el-tree-node__content .el-checkbox{*/
  /*  display: none;*/
  /*}*/
  .role-tree .el-tree-node .el-tree-node__content .el-tree-node__expand-icon+.el-checkbox{
    display: none;
  }
  .role-tree .el-tree-node .el-tree-node__content .is-leaf.el-tree-node__expand-icon+.el-checkbox{
    display: inline;
  }
  .filter-div{
    padding: 10px 15px;
    background: #fff;
  }
  .role-tree .el-tree-node__label {
    font-size: 14px;
    font-weight: 400;
  }
  /*
   *左边机构数
  */
  .view-main-leftTree{
    padding-right: 20px;
  }
</style>
<script>
    export default {
        name: 'first',
        data () {
            return {
                msg: '主页',
                isCollapse: true,
                queryContainerState:true,
                // 新增弹框显示状态
                dialogFormVisible: false,
                createUserForm: {
                    userName: '',
                    password: '',
                    role: '',
                    roleKey:'',
                    labelRole:'',
                },
                formLabelWidth: '120px',

                filterText: '',
                roleTreeData: [{
                    id: 1,
                    label: '一级 1',
                    disabled: true,
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        disabled: true,
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    disabled: true,
                    children: [{
                        id: 5,
                        label: '二级 2-1',
                        disabled: true,
                        children:[{
                            id: 11,
                            label: '刘宇才'
                        }]
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    disabled: true,
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },


                userForm: {
                    userName: '',
                    role: '',
                },
                drawer: false,
                generateData:[
                    {
                        key: 0,
                        label: `用户名`,
                    },{
                        key: 1,
                        label: `用户角色`,
                    },{
                        key: 2,
                        label: `创建时间`,
                    },{
                        key: 3,
                        label: `状态`,
                    },
                ],
                // istrue属性存放列的状态
                colData: [
                    { title: '角色名称', istrue: true },
                    { title: '角色编码', istrue: true },
                    { title: '角色分类', istrue: true },
                    { title: '创建时间', istrue: true },
                    { title: '状态', istrue: true },
                ],
                //右边穿梭框显示的数据,元素为generateData的key
                generateValue: [],

                direction: 'rtl',
                state:[{ text: '在线', value: '在线' }, { text: '离线', value: '离线' }],
                tableData: [{
                    roleName: '王小虎',
                    roleCode:'CEO',
                    roleStatus:'管理层',
                    createTime: '2016-05-01 12:20:54',
                    state: '在线',
                }, {
                    roleName: '王小虎',
                    roleCode:'CEO',
                    roleStatus:'管理层',
                    createTime: '2016-05-01 12:20:54',
                    state: '在线',
                }, {
                    roleName: '王小虎',
                    roleCode:'CEO',
                    roleStatus:'管理层',
                    createTime: '2016-05-01 12:20:54',
                    state: '在线',
                }, {
                    roleName: '王小虎',
                    roleCode:'CEO',
                    roleStatus:'管理层',
                    createTime: '2016-05-01 12:20:54',
                    state: '在线',
                }, {
                    roleName: '王小虎',
                    roleCode:'CEO',
                    roleStatus:'管理层',
                    createTime: '2016-05-01 12:20:54',
                    state: '在线',
                }, {
                    roleName: '王小虎',
                    roleCode:'CEO',
                    roleStatus:'管理层',
                    createTime: '2016-05-01 12:20:54',
                    state: '在线',
                }],

                orgFilterText: '',
                defaultOrgProps: {
                    children: 'children',
                    label: 'label'
                },
                orgTreeData: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
            }
        },
        watch: {
            //tree过滤要设置监听才可以
            filterText(val) {
                this.$refs.tree.filter(val);
            },
            orgFilterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            // handleClose(key, keyPath) {
            //     console.log(key, keyPath);
            // },
            onSubmit() {
                console.log('submit!');
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            sortChange( column, prop, order){
                console.log(column);
                console.log(prop);
                console.log(order);
                if(column.prop=='createTime'){
                    if(column.order == 'descending'){
                        console.log("时间降序")
                    }else if(column.order == 'ascending'){
                        console.log("时间升序")
                    }

                }
            },
            filterTag(value, row) {
                console.log(".......");
                console.log(value);
                console.log(row);
                return row.status === value;
            },
            fnFilterChangeInit(filters){
                console.log("filters");
                console.log(filters);
                console.log(filters[0]);
            },handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            // 关闭Drawer 抽屉
            handleClose(done) {
                done();
            },
            // 关闭Drawer 抽屉
            closeQueryContainer() {
                if(this.queryContainerState){
                    this.queryContainerState = false;
                }else{
                    this.queryContainerState = true;
                }
            },
            // 当前值(即穿梭框右边的key数组元素)、数据移动的方向（'left' / 'right'）、发生移动的数据 key 数组
            transferCol(value, direction, movedKeys) {
                console.log(value, direction, movedKeys);
                for(var i = 0;i<movedKeys.length;i++){
                    if(direction == "left"){
                        this.colData[movedKeys[i]].istrue = true
                    }else{
                        this.colData[movedKeys[i]].istrue = false
                    }
                }
            },

            selectRole(data,node,self){
                console.log(data);
                console.log(node);
                console.log(self);
                // console.log(this.$refs.tree.getCheckedKeys());
                // console.log(this.$refs.tree.getCheckedNodes());
                if(!data.disabled){
                    var checkedArr = this.$refs.tree.getCheckedKeys();
                    for(var i =0;i<checkedArr.length;i++){
                        this.$refs.tree.setChecked(checkedArr[i],false,false);
                    }
                    this.$refs.tree.setChecked(data,true,false);//设置勾选的值
                    this.createUserForm.role = data.label;
                }
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            //阻止冒泡事件
            stopBubbing(){
                console.log("aaaa");
            },
            //设置当用户角色下拉框隐藏时，设置select的key,否则一选中，下拉框就消失了
            closeSelect(state){
                if(state){
                    this.createUserForm.roleKey=createUserForm.role;
                }
            },

            orgFilterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            }
        }
    }
</script>

