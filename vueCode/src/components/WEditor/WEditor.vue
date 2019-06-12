<template lang="html">
  <div class="wangEditor-box">
    <div class="wangeditor" :id="editorName" ></div>
  </div>
</template>

<script>
  import WangEditor from 'wangeditor'
 import baseURL from '$lib/utils/baseURL';
  import {
    Message
  } from 'element-ui';



  export default {
    data() {
      return {
        content: '',
        editor: ''
      }
    },
    props: {
      value: {
        type: String,
        default: null
      },
      editorName: {
        type: String
      },
      length:{
        type: String,
        default:null
      }
    },
    mounted() {
      this.createEditor()
    },
    watch: {
      value: function (newValue, oldValue) {
        this.editor.txt.html(newValue);
        // if (newValue === oldValue) return;
        // this.editor.txt.html(newValue);
      }
    },
    methods: {
      createEditor() {
        this.editor = new WangEditor('#' + this.editorName);
        // this.editor.customConfig.menus = ['head', 'bold', 'italic', 'underline', 'strikeThrough', 'foreColor', 'backColor', 'link', 'list', 'justify', 'quote', 'emoticon', 'image', 'table', 'video', 'code', 'undo', 'redo']

        this.editor.customConfig.uploadImgServer = baseURL() + 'upload/imgUpload?filePath=product';
        this.editor.customConfig.uploadFileName = 'file';
        this.editor.customConfig.zIndex = 1000;
        this.editor.customConfig.uploadImgHooks = {
          before: function (xhr, editor, files) {
            // 图片上传之前触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
            console.log(xhr);
          },
          fail: function (xhr, editor, result) {
            console.log(editor);
          },
          // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
          // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
          customInsert: function (insertImg, result, editor) {
            // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
            // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
            if (result.succ) {
              insertImg(result.entity)
            } else {
              Message({
                message: result.message,
                type: 'error',
                duration: 5 * 1000
              });
            }
            // result 必须是一个 JSON 格式字符串！！！否则报错
          }
        }
        this.editor.customConfig.onchange = (html) => {
        this.content = html;
          this.$emit("listenWEditorChange", html);
        }
        this.editor.create()
      },
      defaultValue(value) {
        console.log('aaaa' + value)
        // this.editor.txt.html(value);
        this.$nextTick(() => {
          this.editor.txt.html(value);
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
