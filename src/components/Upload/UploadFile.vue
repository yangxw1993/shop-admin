<template>
  <Upload
    multiple
    name="file_content"
    :format="['jpg','jpeg','png']"
    :headers="headersData"
    :data="uploadData"
    :on-success="uploadSuccess"
    action="http://pyplatform.vm.cn/upload_file">
    <Button icon="ios-cloud-upload-outline">上传图片</Button>
  </Upload>
</template>

<script>
  export default {
    name: "uploadFile",
    data(){
      return {
        headersData: {
          token: localStorage.getItem('token')
        },
        uploadData:{
          // "save_path": "temp/a/b",
          "rename": 1, // 1 是 0 否
        },
      }
    },
    methods: {
      uploadSuccess(res,file){
        // name: (...)
        // percentage: (...)
        // response:
        //   code: "0"
        // msg: "文件上传成功"
        // path: "export/20210426/16194202906452742.png"
        if(file.response && file.response.code === '0'){
          this.$emit('on-success', file.response.path || '')
        }
        console.log((res,'**', file))
      }
    }
  }
</script>

<style scoped>

</style>
