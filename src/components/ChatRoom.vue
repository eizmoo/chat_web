<template>
  <div>
    <el-row :span="24">
      <h3>we chat root</h3>
    </el-row>
    <el-row>
      <el-col :span="7">
        <el-menu
          class="el-menu-vertical"
        >
          <el-menu-item index="0">
            <i class="el-icon-user-solid"></i>
            <span>living user</span>
          </el-menu-item>
          <el-menu-item @click="userClick()" index="2">
            <i class="el-icon-user"></i>
            <span>用户一</span>
          </el-menu-item>
          <el-menu-item
            v-for="(type, index) in userList"
            :key="index"
            @click="userClick(type)" index="index + 2">
            <i class="el-icon-user"></i>
            <span>{{type}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="12">
        <h4>
          <i class="el-icon-user"></i>
          <span>用户一</span>
        </h4>
        <el-row>
          <el-col :span="2"><i class="el-icon-user"></i></el-col>
          <el-col :span="20" style="text-align: left">聊天内容</el-col>
        </el-row>
      </el-col>
    </el-row>

    <!--输入token弹框-->
    <el-dialog
      title="输入用户名"
      :visible.sync="!is_token_exist"
      width="30%"
      :before-close="handleClose()">
      <el-row>
        <el-col :span="5">请输入昵称：</el-col>
        <el-col :span="15">
<!--          <el-input v-model="input" placeholder="昵称，例如tom">{{USER_TOKEN}}</el-input>-->
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="handleClose()">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>

  </div>
</template>

<script>
  import {getWebSocket} from "../assets/js/common/webpack/WebPack.js"
  import {getUserListHttp} from "../assets/js/common/axios-utils/api"
  import {USER_TOKEN} from "../assets/js/common/constant/constant"
  import {generateUUID} from "../assets/js/common/util"

  export default {
    name: "ChatRoom",
    data() {
      return {
        websocket: null,
        userList: [],
        is_token_exist: false
      }
    },
    methods: {
      userClick(token) {
        console.log('click' + token)
      },
      getUserList(queryGroup, groupToken) {
        getUserListHttp(queryGroup, groupToken).then(result => {
          this.userList = result.data
          console.log(this.userList)
        }).catch(function (reason) {
          console.log('catch ex:' + reason)
        })
      },
      checkToken() {
        if (USER_TOKEN == null) {
          this.is_token_exist = false
        }
      },
      handleClose() {
        console.log(USER_TOKEN)
        if (USER_TOKEN == null) {
          USER_TOKEN = generateUUID(10)
        } else {
          USER_TOKEN = USER_TOKEN + '_' + generateUUID(6)
        }
        this.websocket = getWebSocket()
      }
    },
    mounted() {
      if (this.websocket != null) {
        this.getUserList(0, null)
      }
    }
  }
</script>
<style scoped>
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 300px;
    /*min-height: 400px;*/
  }
</style>
