<template>
  <section>
    <query-criteria></query-criteria>
    <div>
      <el-button type="primary" @click="handleSelectAll">全选</el-button>
      <el-button type="primary" @click="addGods">新增商品</el-button>
<!--      <Table border ref="selection" :columns="columns4" :data="data1"></Table>-->

    </div>
  </section>
</template>

<script>
import queryCriteria from './query-criteria'
export default {
  components: {queryCriteria},
  data(){
    return{
      selectAll: false,
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },
  methods: {
    handleSelectAll () {
      this.selectAll = !this.selectAll;
      this.$refs.selection.selectAll(this.selectAll);
    },
    addGods(){
      this.$router.push({
        path: '/goods/add',
        query: {}
      })
    }
  }
}
</script>

<style>

</style>
