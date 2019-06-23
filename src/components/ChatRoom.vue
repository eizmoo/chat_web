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
        </el-menu>
      </el-col>
      <el-col :span="12">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "ChatRoom",
    methods: {
      userClick() {
        console.log('click')
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
