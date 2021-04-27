<template>
  <section>
    <Form ref="goods" :model="goods" :rules="ruleValidate" :label-width="120">
      <FormItem label="商品SKU" prop="product_base_code">
        <Input v-model="goods.product_base_code" placeholder="商品编号：sku" style="width: 500px" />
      </FormItem>
      <FormItem label="分类ID" prop="category_code">
        <Input v-model="goods.category_code" placeholder="商品编号：sku" style="width: 500px" />
      </FormItem>
      <FormItem label="商品全名" prop="product_full_name">
        <Input v-model="goods.product_full_name" placeholder="商品全名" style="width: 500px"/>
      </FormItem>
      <FormItem label="商品短名" prop="product_short_name">
        <Input v-model="goods.product_short_name" placeholder="商品短名" style="width: 500px"/>
      </FormItem>
      <FormItem label="商品副标题" prop="desc">
        <Input v-model="goods.sub_title"  style="width: 500px"/>
      </FormItem>
      <FormItem label="关键字" prop="desc">
        <Input v-model="goods.key_words"  style="width: 500px"/>
      </FormItem>
      <FormItem label="商品类别" prop="goods_type">
        <Select v-model="goods.goods_type" style="width: 200px">
          <Option value="beijing">实物</Option>
          <Option value="shanghai">实物</Option>
        </Select>
      </FormItem>
      <FormItem label="商品状态" prop="type">
        <RadioGroup v-model="goods.status" @on-change="changGoodsStatus">
          <Radio v-for="item in goodsType" :key="item.value" :label="item.text" ></Radio>
        </RadioGroup>
<!--        <Select v-model="goods.type" placeholder="选择商品类别" style="width: 200px">-->
<!--          <Option value="inShelf">上架</Option>-->
<!--          <Option value="outShelf">下架</Option>-->
<!--        </Select>-->
      </FormItem>
      <FormItem label="产品描述" prop="description">
        <Input v-model="goods.description" placeholder="产品描述" style="width: 500px"/>
      </FormItem>
      <FormItem label="产品信息" prop="product_info">
        <Input v-model="goods.product_info" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="产品信息"  style="width: 500px"/>
      </FormItem>
      <FormItem label="产品详情页" prop="product_html_url">
        <Input v-model="goods.product_html_url" :autosize="{minRows: 2,maxRows: 5}" placeholder="产品信息"  style="width: 500px"/>
      </FormItem>
      <FormItem label="上传图片" prop="product_pic_url">
        <uploadFile @on-success="handleUpload" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('goods')">保存</Button>
        <Button @click="handleReset('goods')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>

  </section>
</template>
<script>
  import uploadFile from '@/components/Upload/UploadFile';
  import  {createProduct} from '@/api/goods'
  export default {
    components: {uploadFile},
    data () {
      return {
        goods: {
          "product_base_code":"123456",
          "company_code":"SELECTED",
          "company_name":"SELECTED",
          "category_code":"123",
          "product_full_name":"春季男士基础百搭纯色休闲夹克外套",
          "product_short_name":"纯色休闲夹克外套",
          "goods_type":"实物",
          "sub_title":"夹克外套",
          "brand":"SELECTED",
          "product_pic_url": ['12312'],
          "key_words":"关键字",
          "status": 1,
          "product_info":"面料:聚酯纤维100% (涂层除外），里料:锦纶100% ，罗纹: 锦纶76% 聚酯纤维22% 氨纶1% 二烯类弹性纤维1%",
          "description":"123",
          "onshelf_time":"2010-12-1",
          "offshelf_time":"2020-10-1",
          "property_1_name":"颜色",
          "property_2_name":"尺寸",
          "property_3_name":"厚度",
          "property_4_name":"款式",
          "product_html_url":"www.two.com",
          "create_by":"",
          "update_by":"",
        },
        ruleValidate: {
          product_base_code: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          category_code: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          product_full_name: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          product_short_name: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          goods_type: [
            { required: true, message: '请选择类别', trigger: 'change' }
          ],
          product_pic_url: [
            { required: true, type: 'array', min: 1, message: '请上传图片', trigger: 'change' },
          ]
        },
        goodsType: [
          {
            text: '上架',
            value: 1
          },
          {
            text: '下架',
            value: 0
          }
        ]

      }
    },
    created(){
      const userInfo = this.$localGetItem('userInfo');
      this.goods.create_by = userInfo.email;
    },
    methods: {
      changGoodsStatus(e){
        const selectType = this.goodsType.find(item => item.text === e);
        this.goods.status = selectType.value;
        console.log(e,'EEE')
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            console.log(this.goods)
            createProduct(this.goods).then(res => {
              console.log(res)
            }).catch(err => this.$Message.error(err.message))
          } else {
            this.$Message.error('数据不完整');
          }
        })
      },
      handleUpload(path){
        this.goods.product_pic_url.push(path)
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
