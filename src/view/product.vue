<template>
  <div class="view-body">
<!--    <h1>first</h1>-->
    <el-card shadow="never" class="query-container">
      <div v-if="queryContainerState">
        <el-form :inline="true" :model="userForm" ref="userForm" label-position="right" label-width="100px" size="small" class="demo-form-inline">
          <el-row>
            <el-col :xs="24" :sm="12" :md="8">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="userForm.userName" placeholder="用户名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8">
              <el-form-item label="角色" prop="role">
                <el-select v-model="userForm.role" placeholder="角色">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
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
          <el-button type="primary" icon="el-icon-plus" size="small" @click="drawer = true">新增</el-button>
        </div>
        <div style="float: right">
          <el-button icon="el-icon-s-operation" circle size="small" @click="drawer = true"></el-button>
          <el-button icon="el-icon-search" circle size="small" @click="closeQueryContainer"></el-button>
        </div>
      </el-row>
    </el-card>
    <div class="view-container">
      <div class="view-main">
        <el-row>
          <el-col :span="6" v-for="(o, index) in 8" :key="o" class="product-item">
            <el-card :body-style="{ padding: '0px' }">
              <div class="product-item-body">
                <div class="clearfix">
                  <div class="product-item-img-main fl">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png">
                  </div>
                  <div class="fl">
                    <div class="product-name">演示产品</div>
                    <div class="product-sub-name">副标题</div>
                  </div>
                </div>
                <div class="product-item-msg">
                  <el-row>
                    <el-col :span="8">
                      <div class="product-item-msg-title">设备数量</div>
                      <div class="product-item-device-num">
                        <a>2</a>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="product-item-msg-title">发布状态</div>
                      <div class="product-item-public-status">
                        <span class="status-dot status-green"></span>
                        <span style="font-size: 14px;font-weight: 600;">已发布</span>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="product-item-msg-title">产品类型</div>
                      <div style="font-size: 14px;font-weight: 600;">
                        直连设备
                      </div>
                    </el-col>
                  </el-row>

                </div>
              </div>
              <div class="product-item-foot">
                <el-row>
                  <el-col :span="6" class="product-item-action-item">
                    <el-tooltip class="item" effect="dark" content="查看" placement="top">
                      <span class="spilt-line">
                        <i class="el-icon-view"></i>
                      </span>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="6" class="product-item-action-item">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                      <span class="spilt-line">
                        <i class="el-icon-edit"></i>
                      </span>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="6" class="product-item-action-item">
                    <el-tooltip class="item" effect="dark" content="下载" placement="top">
                      <span class="spilt-line">
                        <i class="el-icon-download"></i>
                      </span>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="6" class="product-item-action-item">
                    <el-dropdown style="width: 100%;margin: 0">
                      <span>
                        <i class="el-icon-more"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown" style="left: 50%" class="product-item-action-dropdown">
                        <el-dropdown-item>
                          <i class="el-icon-close"></i>停用</el-dropdown-item>
                        <el-dropdown-item><i class="el-icon-remove-outline"></i>删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div class="block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>
      </div>
    </div>

    <el-drawer
      size="40%"
      :title="editTitle"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose">
      <el-container style="height: 100%;">
        <el-main>
          <el-form ref="form" :model="form" label-width="80px" style="padding-left: 30px;padding-right: 30px">
            <el-form-item label="名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="特殊资源">
              <el-radio-group v-model="form.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
          </el-form>
        </el-main>
        <el-footer>
<!--          <el-form-item>-->
<!--            <el-button type="primary" @click="onSubmit">立即创建</el-button>-->
<!--            <el-button>取消</el-button>-->
<!--          </el-form-item>-->
        </el-footer>
      </el-container>

    </el-drawer>
  </div>
</template>

<style>

  .view-body{
    border-radius: 4px;
    overflow: hidden;
  }
  .view-container{
    margin-top: 10px;
    border-radius: 2px;
  }

  /*设置查询输入框宽度*/
  .query-container{
    margin: 10px;
  }
  .query-container .el-form .el-input{
    width: 150px;
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

  .role-select-option{
    padding-right: 0px;
    padding-left: 0px;
  }
  .role-tree {
    min-height: 120px;
    max-height: 150px;
    overflow-y: scroll;
  }

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

  .product-item{
    padding: 10px;
  }
  .product-item-body{
    padding: 20px;
  }
  .product-item-img-main{
    margin-right: 20px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    overflow: hidden;
  }
  .product-item-msg{
    margin-top: 20px;
  }
  .product-item-msg div{
    text-align: center;
    line-height: 20px;
  }
  .product-item-msg a{
    color: #1890ff;
  }
  .product-item-msg-title{
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }
  .product-item-img-main img{
    max-height: 40px;
    max-width: 40px;
  }
  .clearfix:before, .clearfix:after {
    content: '';
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
  .status-dot{
    width: 6px;
    height: 6px;
    vertical-align: middle;
    display: inline-block;
    border-radius: 50%;
  }
  .status-green{
    background: #52c41a;
  }
  .status-red{
    background: #f5222d;
  }
  .product-item-foot{
    background: #fafafa;
    border-top: 1px solid #e8e8e8;
  }
  .product-item-action-item{
    height: 48px;
    line-height: 48px;
    text-align: center;
    cursor: pointer;
  }
  .product-item-action-item span{
    line-height: 22px;
    display: inline-block;
    height: 22px;
    width: 100%;
  }
  .spilt-line{
    border-right: 1px solid #e8e8e8;
  }
  .product-item-action-dropdown .el-dropdown-menu__item{
    color: #2BC2E8;
  }
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    background: white;
  }
  .el-drawer__header{
    margin-bottom: 15px;
  }
  .el-drawer__body{
    border-top: 1px solid #e8e8e8;
  }
  .el-drawer__body .el-main{
    background: white;
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
            { title: '用户名', istrue: true },
            { title: '用户角色', istrue: true },
            { title: '创建时间', istrue: true },
            { title: '状态', istrue: true },
        ],
        //右边穿梭框显示的数据,元素为generateData的key
        generateValue: [],

        direction: 'rtl',
        status:[{ text: '在线', value: '在线' }, { text: '离线', value: '离线' }],



        orgFilterText: '',
        defaultOrgProps: {
            children: 'children',
            label: 'label'
        },

        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,

        //设置drawer
        editTitle: "新增",
        drawer: false,
        direction: 'rtl',

        form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        }

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
      //   console.log(key, keyPath);
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
      },

      //分页
      handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
      }
  }
}
</script>

