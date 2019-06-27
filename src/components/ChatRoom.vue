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
          <el-menu-item @click="this.current_char_user == null">
            <i class="el-icon-user-solid"></i>
            <span>user</span>
          </el-menu-item>
          <el-menu-item
            v-for="(type, index) in userList"
            :key="index"
            @click="userClick(type)">
            <i class="el-icon-user"></i>
            <span>{{type}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="12" v-if="this.current_char_user!=null">
        <h4>
          <i v-if="this.current_char_user != null" class="el-icon-user"></i>
          <span>{{current_char_user}}</span>
        </h4>
        <el-row style="height: 300px">
          <el-row>
            <el-row style="font-size: 9px;text-align: left">
              {{current_char_user}}
            </el-row>
            <div style="text-align: left; margin-bottom: 5px">
              在吗
            </div>
          </el-row>
          <el-row>
            <el-row style="font-size: 9px;text-align: right">
              {{user_token}}
            </el-row>
            <div style="text-align: right; margin-bottom: 5px">
              不在，滚啊
            </div>
          </el-row>
        </el-row>
        <el-row style="height: 40px">
          <el-col :span="20">
            <el-input v-model="inputMessage" placeholder="请输入聊天内容"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button plain @click="sendMessage()">发送</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!--输入token弹框-->
    <el-dialog
      title="输入用户名"
      :visible="!is_token_exist"
      width="30%">
      <!--      :before-close="handleClose()">-->
      <el-row>
        <el-col :span="5" style="line-height: 40px;">请输入昵称：</el-col>
        <el-col :span="15">
          <el-input v-model="user_token" placeholder="昵称，例如tom"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="handleClose()">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import {getWebSocket} from "../assets/js/common/webpack/WebPack"
  import {getUserListHttp, sendMessageHttp} from "../assets/js/common/axios-utils/api"
  import {generateUUID} from "../assets/js/common/util"

  export default {
    name: "ChatRoom",
    data() {
      return {
        user_token: null,
        websocket: null,
        userList: [],
        is_token_exist: this.checkToken(),
        current_char_user: null,
        inputMessage: '',
      }
    },
    methods: {
      userClick(token) {
        this.current_char_user = token
      },
      getUserList(queryGroup, groupToken) {
        if (this.is_token_exist) {
          if (queryGroup == null) {
            queryGroup = 0
          }
          getUserListHttp(queryGroup, groupToken).then(result => {
            this.userList = result.data
            console.log(this.userList)
          }).catch(function (reason) {
            console.log('catch ex:' + reason)
          });
        }
      },
      checkToken() {
        return this.user_token != null
      },
      handleClose() {
        console.log(this.user_token)
        if (this.user_token == null) {
          this.user_token = generateUUID(10)
        } else {
          this.user_token = this.user_token + '_' + generateUUID(6)
        }
        this.websocket = getWebSocket(this.user_token)
        this.websocket.onmessage = this.showMessage
        this.is_token_exist = true
        this.getUserList(0, null)
      },
      sendMessage() {
        sendMessageHttp(this.user_token, this.current_char_user, this.inputMessage, 1).then(result => {
          console.log(result)
        })
      },
      showMessage(e) {

      }
    },
    mounted() {
      setInterval(this.getUserList, 300000);
      window.onbeforeunload = e => {
        if (this.websocket != null) {
          this.websocket.close()
        }
      };
    }
  }
</script>
<style scoped>
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 300px;
    min-height: 650px;
  }
</style>
