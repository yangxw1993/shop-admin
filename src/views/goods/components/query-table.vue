<template>
  <div class="query-table">
    <div >
      <Checkbox
        :value="checkAll"
        :indeterminate="indeterminate"
        @click.prevent.native="handleCheckAll"
      >当前页全选</Checkbox>
      <Button type="primary" class="margin-left-10" @click="setClassify">设置分类</Button>
      <Button
        v-if="goodsTabFlag===1"
        type="primary"
        class="margin-left-10"
        @click="setClassifyList('InShelf')"
      >上架</Button>

      <!-- 20190428  张军让把永久下架按钮暂时隐藏 -->
      <!-- 20200604  思聪让把永久下架按钮暂打开 只有思聪可看 -->
      <Button type="primary" class="margin-left-10" v-if="isDa==='DA00532055'" @click="setClassifyList('OffShelf')">永久下架</Button>
      <Button type="primary" class="margin-left-10" @click="setClassifyList('OutShelf')">暂时下架</Button>
      <!-- 20200603 新增商品详情 v-if="isDa==='bestseller'"-->
      <!-- v-if="isDa==='bestseller'" -->
      <Button type="primary"  class="margin-left-10" @click="newAddGoods()">新增商品详情</Button>
      <Button
        type="primary"
        class="margin-left-10"
        v-if="goodsTabFlag===0 && isTempShow"
        @click="tempGoods"
      >确认导</Button>
      <Button
        type="primary"
        class="margin-left-10"
        v-if="goodsTabFlag===0 && isredbookImgShow"
        @click="redbookImgGoodsClick"
      >小红书图片商品导</Button>
      <Button
        type="primary"
        class="margin-left-10"
        v-if="goodsTabFlag===0 && isredbookVideoShow"
        @click="redbookVideoGoodsClick"
      >小红书视频商品导</Button>
      <!--  <Button type="primary" class="margin-left-10" @click="setClassifyList('NvrShelf')">从未上架</Button>-->
      <Button
        v-if="goodsTabFlag===0&&qClassifyId!==-1"
        type="primary"
        class="margin-left-10"
        @click="getgoodsbyid()"
      >货架调整</Button>
      <Button
        v-if="goodsTabFlag===0&&qClassifyId!==-1"
        type="primary"
        class="margin-left-10"
        @click="exportClassifySort()"
      >导出货架数据</Button>
    </div>
    <div class="margin-top-10">
      <!-- <Table
        border
        :columns="tableHead"
        :width="tableWidth"
        :data="tableBody"
        ref="table1"
        @on-selection-change="selectRow"
      ></Table> -->

      <el-table
          v-loading="tableLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          ref="table1"
          :header-cell-style="{ textAlign: 'center' }"
          :cell-style="{ textAlign: 'center' }"
          :data="tableBody"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="selectRow"
        >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="goods" label="商品" width="120">
          <template slot-scope="scope">
            <el-image
                @click="picClick(scope.row)"
                style="width: 58px;cursor: pointer;"
                :src="scope.row.gscMaincolPath"
                >
            </el-image>
            <div>{{scope.row.gsColorCode}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="商品名称" width="200">
          <template slot-scope="scope">
            <div style="text-align:left">{{scope.row.goodsName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="sellCount" label="实际销量" width="80"></el-table-column>
        <el-table-column prop="goodsType" label="类型" width="80"></el-table-column>
        <el-table-column prop="originalPrice" label="吊牌价" width="80"></el-table-column>
        <el-table-column prop="discountPrice" label="销售价" width="80"></el-table-column>
        <el-table-column prop="discountExhibition" label="折扣" width="80"></el-table-column>
        <el-table-column prop="stock" label="库存数量" width="80"></el-table-column>
        <el-table-column prop="createTime" label="发布时间" width="120"></el-table-column>
        <el-table-column prop="putonTime" label="上架时间" width="120"></el-table-column>
        <el-table-column prop="" label="操作" width="135">
          <template slot-scope="scope">
            <div style="width:130px">
                <el-button  type="primary" size="mini" @click="goodsDetails('detail',scope.row)">详情</el-button>
                <el-button  type="primary" size="mini">预览</el-button>
              </div>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div slot="footer">
      <!-- :current="queryParams.currPage" -->
      <el-pagination
        background
        @current-change="changePage"
        :page-size="page.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </div>
    <!-- 图片弹框 -->
    <Modal  v-model="showImg" fullscreen footer-hide>
      <div style="text-align: center;font-size: 30px;font-weight: bold;">图片区</div>
      <Swiper v-if="picList.length" class="swiper-width" :bannerList="picList"></Swiper>
    </Modal>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Swiper from '@/components/swiper'
// import { updateStatus } from '@/api/deprecated/goodsColor'
import {
  h5GoodsGetColorPage,
  h5GoodsListByClassifyId,
  h5GoodsBatchUpdateShelf
  // h5GoodsBatchExportGoodsColor
} from '@/api/deprecated/goodsUpgrade'

export default {
  name: 'query-table',
  props: {
    tableCardWidth: Number,
    tabelData: Object,
    goodsTabFlag: Number,
    qClassifyId: null,
    goodsCabinetPageInfo: Object
  },
  data () {
    return {
      tableLoading: false,
      showImg: false,
      picList: [],
      isDa: localStorage.getItem('loginName'),
      checkAll: false,
      indeterminate: false,
      isTempShow: false,
      isredbookImgShow: false,
      isredbookVideoShow: false,
      redbookImgGoods: [],
      redbookGoosdVideo: [],
      selectData: [],
      tableHead: [
        {
          type: 'selection',
          width: 60,
          fixed: 'left',
          align: 'center'
        },
        {
          title: '商品',
          key: 'goods',
          width: 120,
          fixed: 'left',
          align: 'center',
          render: (h, params) => {
            return (
              'div',
              [
                h('img', {
                  attrs: {
                    src: params.row.gscMaincolPath,
                    width: 50
                  },
                  style: {
                    margin: '5px'
                  }
                }),
                h(
                  'div',
                  [
                    h('p', params.row.gsColorCode)
                    // h('p', params.row.brandCode)
                  ],
                  {
                    style: {
                      textAlign: 'center',
                      paddingBottom: '10px'
                    }
                  }
                )
              ]
            )
          }
        },
        {
          title: '商品名称',
          key: 'goodsName',
          align: 'left',
          width: 250
        },
        {
          title: '实际销量',
          key: 'sellCount',
          align: 'center',
          width: 90
        },
        {
          title: '类型',
          key: 'goodsType',
          align: 'center'
        },
        {
          title: '吊牌价',
          key: 'originalPrice',
          align: 'center',
          width: 100
        },
        {
          title: '销售价',
          key: 'discountPrice',
          align: 'center',
          width: 90
        },
        {
          title: '折扣',
          key: 'discountExhibition',
          align: 'center',
          width: 90
        },
        {
          title: '库存数量',
          key: 'stock',
          align: 'center',
          width: 90
        },
        {
          title: '发布时间',
          key: 'createTime',
          align: 'center',
          width: 100
        },
        {
          title: '上架时间',
          key: 'putonTime',
          align: 'center',
          width: 100
        },
        {
          title: '操作',
          key: 'option',
          align: 'center',
          width: 90,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    icon: 'search',
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.goodsDetails('detail', params.row)
                    }
                  }
                },
                '详情'
              ),
              // h(
              //   'Button',
              //   {
              //     props: {
              //       icon: 'search',
              //       type: 'info',
              //       size: 'small'
              //     },
              //     style: {
              //       marginTop: '5px'
              //     },
              //     on: {
              //       click: () => {
              //         this.goodsDetails('edit', params.row)
              //       }
              //     }
              //   },
              //   '修改'
              // ),
              h(
                'Button',
                {
                  props: {
                    icon: 'eye',
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginTop: '5px'
                  }
                },
                '预览'
              )
            ])
          }
        }
      ],
      tableBody: [],
      queryParams: {
        currPage: 1,
        gsColorCode: '',
        goodsName: '',
        goodsStatus: 'InShelf',
        goodsType: 'SELL',
        highPrice: '',
        lowPrice: '',
        highStock: '',
        lowStock: '',
        year: '',
        createTimeEnd: '',
        createTimeStart: '',
        // pageSize:'',
        classifyId: -1
      },
      /* 设置上下架 */
      goodsListArr: [],
      /* 设置确认导 */
      tempListArr: [],
      /* 分页 */
      page: {},
      // 记录页码
      readArr: [],
      // 记录获取的全部商品数据
      readGoods: []
    }
  },
  components: {
    Swiper
  },
  watch: {
    tabelData (to, from) {
      this.queryParams = this.tabelData
    },
    tableBody (to, from) {},
    goodsTabFlag (to, from) {},
    qClassifyId (to, from) {}
  },
  computed: {
    // 设置表格高度
    tableWidth: function () {
      if (window.innerWidth < 1366) {
        return 1080
      } else {
        return 1283
      }
    }
    // tableHeight: function () {
    //   if (window.innerWidth < 1366) {
    //     return 500
    //   } else {
    //     return 520
    //   }
    // }
  },
  created () {
    this.getGoodsList(this.queryParams)
    if (this.$route.query.name === 'temp') {
      this.isTempShow = true
    } else {
      this.isTempShow = false
    }
    if (localStorage.getItem('tempData')) {
      const tempLg = JSON.parse(localStorage.getItem('tempData'))
      if (tempLg.length > 9) {
        localStorage.removeItem('tempData')
      } else {
        this.tempListArr = tempLg
      }
    }
    if (this.$route.query.name && this.$route.query.name.indexOf('redBookImg') > -1) {
      this.isredbookImgShow = true
    } else {
      this.isredbookImgShow = false
    }
    if (localStorage.getItem('redbookGoosdImgLists')) {
      const redbookImgGoods = JSON.parse(localStorage.getItem('redbookGoosdImgLists'))
      this.redbookImgGoods = redbookImgGoods
    }
    if (this.$route.query.name && this.$route.query.name.indexOf('redBookVodeo') > -1) {
      this.isredbookVideoShow = true
    } else {
      this.isredbookVideoShow = false
    }
    if (localStorage.getItem('redbookGoosdVideoLists')) {
      const redbookGoosdVideoLists = JSON.parse(localStorage.getItem('redbookGoosdVideoLists'))
      this.redbookGoosdVideo = redbookGoosdVideoLists
    }
  },
  methods: {
    ...mapMutations(['closeTag']),

    async getGoodsList (params) {
      if (params.classifyId === 1) {
        params.classifyId = -1
      }
      if (params.goodsType === 'all') {
        params.goodsType = ''
      }
      this.queryParams.currPage = params.currPage
      const body = await h5GoodsGetColorPage(params)
      if (body.code === '200') {
        this.page = {
          total: body.data.totalCount,
          pageSize: 12
        }
        this.tableBody = body.data.list
      }
    },
    // 确认导购
    tempGoods () {
      if (this.$route.query.name === 'temp') {
        if (this.selectData.length > 0) {
          if (
            parseInt(this.tempListArr.length) +
              parseInt(this.selectData.length) <
            9
          ) {
            this.selectData.forEach(v => {
              this.tempListArr.push(v)
            })
            localStorage.setItem('tempData', JSON.stringify(this.tempListArr))
            this.jumpClick(1)
          } else {
            this.$message.error('选择的商品最多不能超过8个')
          }
        } else {
          this.$message.error('请选选择商品')
        }
      }
    },
    // 小红书图片商品
    redbookImgGoodsClick () {
      if (this.selectData.length > 0) {
        if (this.$route.query.name === 'redBookImg') {
          const goodsList = []
          this.selectData.forEach(v => {
            goodsList.push({
              gsColorCode: v.gsColorCode,
              discount: v.discount,
              originalPrice: v.originalPrice,
              discountPrice: v.discountPrice,
              goodsName: v.goodsName
            })
          })
          this.redbookImgGoods.push({
            goodsList: goodsList
          })
        } else if (this.$route.query.name && this.$route.query.name.indexOf('redBookImg') > -1) {
          const ind = this.$route.query.name.split('-')[1]
          this.selectData.forEach(v => {
            this.redbookImgGoods[ind].goodsList.push({
              gsColorCode: v.gsColorCode,
              discount: v.discount,
              originalPrice: v.originalPrice,
              discountPrice: v.discountPrice,
              goodsName: v.goodsName
            })
          })
        }
        localStorage.setItem('redbookGoosdImgLists', JSON.stringify(this.redbookImgGoods))
        this.jumpClick(2)
      } else {
        this.$message.error('请选选择商品')
      }
    },
    redbookVideoGoodsClick () {
      if (this.selectData.length > 0) {
        if (this.$route.query.name && this.$route.query.name.indexOf('redBookVodeoEdit') > -1) {
          const ind = this.$route.query.name.split('-')[1]
          this.selectData.forEach(v => {
            this.redbookGoosdVideo[ind].goodsList.push({
              gsColorCode: v.gsColorCode,
              discount: v.discount,
              originalPrice: v.originalPrice,
              discountPrice: v.discountPrice,
              goodsName: v.goodsName
            })
          })
        }
        localStorage.setItem('redbookGoosdVideoLists', JSON.stringify(this.redbookGoosdVideo))
        this.jumpClick(2)
      } else {
        this.$message.error('请选选择商品')
      }
    },
    jumpClick (type) {
      let path
      if (type === 1) {
        path = '/micro-mall/template/details'
      } else if (type === 2) {
        path = '/micro-mall/xiaohongshu/details'
      }
      this.closeTag({
        name: this.$route.name,
        params: this.$route.params,
        query: this.$route.query
      })
      this.$router.push({
        path: path
      })
    },
    async setClassifyList (params) {
      if (this.tableLoading) {
        return
      }
      const colorCodeList = []
      // 上架或发布商品
      this.goodsListArr = []
      if (this.selectData.length > 0) {
        this.selectData.forEach(v1 => {
          this.goodsListArr.push({
            gsColorCode: v1.gsColorCode,
            goodsStatus: params,
            channelId: 1
          })
        })
        // const msg = this.$message.loading({
        //   content: '正在加载,请稍等...',
        //   duration: 0
        // })
        try {
          this.tableLoading = true
          this.goodsListArr.forEach(item => {
            colorCodeList.push(item.gsColorCode)
          })

          const body = await h5GoodsBatchUpdateShelf({
            channelId: 1,
            goodsStatus: params,
            colorCodeList: colorCodeList
          })

          if (body.code === '200') {
            this.$message.success('成功')
            if (this.goodsTabFlag === 0) {
              this.queryParams.goodsStatus = 'InShelf'
              this.queryParams.classifyId = this.qClassifyId
            } else if (this.goodsTabFlag === 1) { // WareHouse
              this.queryParams.goodsStatus = 'WareHouse'
              this.queryParams.classifyId = this.qClassifyId
            }
            this.tableLoading = false
            this.getGoodsList(this.queryParams)
          } else {
            this.$message.error(body.msg)
          }
        } catch (e) {
          // nothing
        } finally {
          // msg()
          this.tableLoading = false
        }
      } else {
        this.$message.config({
          top: 500
        })
        this.$message.warning('请选择商品')
      }
    },
    async goodsCabinets (currPage, gsColorCode = '') {
      const { qClassifyId } = this
      const body = await h5GoodsGetColorPage({
        currPage: currPage,
        gsColorCode: gsColorCode,
        classifyId: qClassifyId,
        goodsStatus: 'InShelf'
      })
      if (body.code === '200') {
        this.$emit('onUpdateGoodsCabinetPageInfo', {
          total: body.data.totalCount,
          curPage: currPage,
          classifyId: qClassifyId
        })
        this.$emit('upload-cabinet', body.data.list)
      } else {
        this.$message.error(body.msg)
      }
    },
    async exportClassifySort () {
      window.open(`${this.$config.baseUrl}/api/h5Goods/exportClassifySort?classifyId=${this.qClassifyId}&brand=${localStorage.getItem('brand')}&token=${localStorage.getItem('token')}`)
    },
    async getgoodsbyid () {
      this.$emit('closeEvent')
      // let params = {
      //   classifyId: this.qClassifyId,
      //   currPage: 1,
      //   channelId: 1
      // }

      const body = await h5GoodsListByClassifyId(this.qClassifyId)
      if (body.code === '200') {
        this.$emit('upload-goods', body.data)
        this.$emit('originalColorcodeListBtn', body.data)
      } else {
        this.$emit('originalColorcodeListBtn', [])
        this.$message.error(body.msg)
      }
      this.goodsCabinets(this.goodsCabinetPageInfo.curPage) // 重新调用商品列表，参数不同
    },

    /* 全选 */
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false
      // this.$refs.table1.selectAll(this.checkAll)
      if (this.checkAll) {
        this.tableBody.forEach((row, i) => {
          this.$refs.table1.toggleRowSelection(row, true)
        })
      } else {
        this.$refs.table1.clearSelection()
      }
    },
    /* 选择数据 */
    selectRow (selection) {
      this.selectData = selection
    },
    /* 设置分类 */
    setClassify () {
      if (this.selectData.length > 0) {
        // this.$parent.getClassifyList()
        const arr = []
        this.selectData.forEach(item => {
          arr.push({
            gsColorCode: item.gsColorCode,
            classifyIds: item.classifyIds ? item.classifyIds : '',
            classifyNames: item.classifyNames ? item.classifyNames : ''
          })
        })
        this.$emit('classifySelected', arr)
      } else {
        this.$message.warning('请选择商品')
      }
    },
    changePage (page) {
      if (this.tabelData.goodsStatus) {
        this.queryParams = this.tabelData
      } else {
        if (this.qClassifyId !== -1) {
          this.queryParams.classifyId = this.qClassifyId
        } else {
          this.queryParams.classifyId = -1
        }
      }
      if (this.goodsTabFlag === 0) {
        this.queryParams.goodsStatus = 'InShelf'
      } else if (this.goodsTabFlag === 1) {
        this.queryParams.goodsStatus = 'WareHouse'
      }
      this.queryParams.currPage = page
      this.getGoodsList(this.queryParams)
    },
    /* 查看详情 */
    goodsDetails (type, data) {
      if (type === 'detail') {
        this.$router.push({
          path: '/goods/info/details',
          query: {
            goodsCode: data.gsColorCode,
            hidePublish: true
          }
        })
      } else if (type === 'edit') {
        this.$router.push({
          path: '/goods/info/details-add',
          query: {
            goodsCode: data.gsColorCode,
            hidePublish: true
          }
        })
      }
    },
    newAddGoods () {
      this.$router.push({
        path: '/goods/info/details-add',
        query: {}
      })
    },
    // 点击商品图
    picClick (data) {
      this.picList = []
      const nineCode = data.gsColorCode.slice(0, 9)
      const brand = {
        1: 'ONLY',
        2: 'JACKJONES',
        3: 'VEROMODA',
        4: 'SELECTED',
        5: 'JLINDEBERG',
        8: 'NAMEIT',
        P: 'VEROMODA'
      }[String(nineCode)[0]]
      const suffix = ['_p1.jpg', '_p2.jpg', '_p3.jpg', '_p4.jpg', '_p5.jpg', '_p7.jpg', '_T01.jpg', '_T02.jpg', '_T03.jpg', '_T04.jpg', '_T05.jpg']
      suffix.forEach(item => {
        this.picList.push(`${this.$config.picUrl}/goodsImagePC/${brand}/${nineCode}/${data.gsColorCode}/${data.gsColorCode}${item}`)
      })
      this.showImg = true
    }

  }
}
</script>
<style scoped>
.flex {
  display: flex;
  flex-direction: row;
}
.flexWrap {
  flex-wrap: wrap;
}
.lineH32 {
  line-height: 32px;
}
.marginTop5{
  margin-top: 5px;
}
.marginRight10{
  margin-right: 10px;
}
.swiper-width{
 width: 95%;
 height: 95%;
}
</style>
