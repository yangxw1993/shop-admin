<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-card>

          <left-bar></left-bar>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card>
          <goods-list></goods-list>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import leftBar from './components/leftBar'
import goodsList from './components/goodsList.vue'
export default {
  components:{leftBar, goodsList}
}

</script>

<style>

</style>
