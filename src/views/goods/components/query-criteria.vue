<template>
  <div class="query-criteria">
    <div class="flex flexWrap">
      <div class="marginRight10 marginBottom5">
        <el-input v-model="queryData.gsColorCode" placeholder="SKU" style="width: 200px"/>
      </div>
      <div class="flex marginRight10 marginBottom5">
        <p class="lineH32">类型:</p>
        <el-select v-model="queryData.goodsType" style="width: 162px">
          <Option value="all">全部</Option>
          <Option value="SELL">销售</Option>
          <Option value="PRESELL">预售</Option>
        </el-select>
      </div>
      <div class="marginRight10 marginBottom5">
         <el-input v-model="queryData.goodsName" placeholder="名称" style="width: 200px"/>
      </div>
      <div class="marginRight10 marginBottom5">
        <el-input v-model="queryData.lowPrice" placeholder="最低价格" style="width: 200px"/>
      </div>
      <div class="marginRight10 marginBottom5">
        <el-input v-model="queryData.highPrice" placeholder="最高价格" style="width: 200px"/>
      </div>
    </div>
    <div class="flex flexWrap">
      <div class="marginRight10 marginBottom5">
         <el-input v-model="queryData.lowStock" placeholder="最低库存" style="width: 200px"/>
      </div>
      <div class="marginRight10 marginBottom5">
         <el-input v-model="queryData.highStock" placeholder="最高库存" style="width: 200px"/>
      </div>
      <div class="marginRight10 marginBottom5">
        <el-date-picker
          type="datetime"
          :value="queryData.createTimeStart"
          placeholder="创建开始时间"
          @on-change="startTimeClick"
          style="width: 200px"
        ></el-date-picker>
      </div>
      <div class="marginRight10 marginBottom5">
        <el-date-picker
          type="datetime"
          :value="queryData.createTimeEnd"
          placeholder="创建结束时间"
          @on-change="endTimeClick"
          style="width: 200px"
        ></el-date-picker>
      </div>
      <div class="marginRight10 marginBottom5">
        <el-date-picker
          type="year"
          :value="queryData.year"
          placeholder="商品年份"
          @on-change="yearClick"
          style="width: 200px"
        ></el-date-picker>
      </div>

    </div>
    <div class="marginBottom20">
      <el-button class="marginRight10" type="primary" icon="md-search" @click="query">查询</el-button>
      <el-button  type="primary" icon="md-download" @click="exportClick()">导出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'query-criteria',
  props: {
    querySta: String
  },
  data () {
    return {
      msg: 'Hello World',
      queryData: {
        gsColorCode: '',
        goodsType: 'SELL',
        goodsName: '',
        highPrice: '',
        lowPrice: '',
        highStock: '',
        lowStock: '',
        year: '',
        createTimeEnd: '',
        createTimeStart: ''
      }
    }
  },
  mounted() {

  },
  methods: {
    query () {
      this.queryData.createTimeEnd = this.queryData.createTimeEnd === '' ? '' : new Date(this.queryData.createTimeEnd).valueOf()
      this.queryData.createTimeStart = this.queryData.createTimeStart === '' ? '' : new Date(this.queryData.createTimeStart).valueOf()
      this.$emit('parentQuery', this.queryData)
      console.log(this.queryData)
    },
    startTimeClick (time) {
      this.queryData.createTimeStart = time
      // this.startTime = starTime.replace(/-/g, '/')
    },
    endTimeClick (time) {
      this.queryData.createTimeEnd = time
      // this.startTime = starTime.replace(/-/g, '/')
    },
    yearClick (time) {
      this.queryData.year = time
      // this.startTime = starTime.replace(/-/g, '/')
    },
    exportClick () {
      this.queryData.createTimeEnd = this.queryData.createTimeEnd === '' ? '' : new Date(this.queryData.createTimeEnd).valueOf()
      this.queryData.createTimeStart = this.queryData.createTimeStart === '' ? '' : new Date(this.queryData.createTimeStart).valueOf()
      this.$emit('parentExport', this.queryData)
    }
  }
}
</script>

<style type="text/css" scoped>
.flex {
  display: flex;
  flex-direction: row;
}
.flexWrap {
  flex-wrap: wrap;
}
.lineH32 {
  line-height: 32px;
  width: 36px;
}
.marginTop5{
  margin-top: 5px;
}
.marginBottom5{
  margin-bottom: 5px;
}
.marginBottom20{
  margin-bottom: 20px;
}
.marginRight10{
  margin-right: 10px;
}
</style>
