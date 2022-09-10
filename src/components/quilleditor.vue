<!-- 组件代码如下 -->
<template>
    <div class="quillEditorbox">
        <el-upload class="avatar-uploader quillEditor none" :action="picurl" :headers="uploadHeaders" name="thumbnail" multiple :show-file-list="false" :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeUpload" accept=".png,.jpg,jpeg,.gif,.bmp"></el-upload>
        <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @change="onEditorChange($event)" @ready="onEditorReady($event)"></quill-editor>
    </div>
</template>
<script>
// import { quillRedefine } from "vue-quill-editor-upload";
import { quillEditor } from 'vue-quill-editor';
export default {
    props: ['quillcon', 'uploadApi'],
    name: 'qe',
    components: {
        quillEditor
        // quillRedefine
    },
    data() {
        return {
            picimg: '',
            picurl: (this.uploadApi || this._config) + '/web/webArchives/uploadFile',
            content: this.quillcon,
            uploadHeaders: {
                Authorization: this._storage.LStorage.get('_t')
            },
            editorOption: {
                modules: {
                    toolbar: {
                        container: [
                            [
                                {
                                    size: ['small', false, 'large']
                                }
                            ],
                            ['bold', 'italic'],
                            [
                                {
                                    list: 'ordered'
                                },
                                {
                                    list: 'bullet'
                                }
                            ],
                            ['link', 'image']
                        ], // 工具栏
                        handlers: {
                            image: function (value) {
                                if (value) {
                                    document.querySelector('.quillEditor input').click();
                                } else {
                                    this.quill.format('image', false);
                                }
                            }
                        }
                    },

                    history: {
                        delay: 1000,
                        maxStack: 50,
                        userOnly: false
                    }
                }
            } // 必须初始化为对象 init  to Object
        };
    },
    mounted() {
        // console.log(this.quillcon);
        // 设置文本悬浮提示
        document.querySelector('[data-placeholder]').setAttribute('data-placeholder', '请输入内容');
    },
    methods: {
        // 上传图片前
        beforeUpload(res, file) {},
        // 上传图片成功
        uploadSuccess(res, file) {
            let quill = this.$refs.myQuillEditor.quill;
            // 如果上传成功
            if (res.code == 200) {
                // 获取光标所在位置
                let length = quill.getSelection().index;
                // 插入图片  res.info为服务器返回的图片地址
                quill.insertEmbed(length, 'image', res.data.absolutePath);
                // 调整光标到最后
                quill.setSelection(length + 1);
            } else {
                this.$message.error('图片插入失败');
            }
            // loading动画消失
            this.quillUpdateImg = false;
        },
        // 上传图片失败
        uploadError(res, file) {
            this.quillUpdateImg = false;
            this.$message.error('图片插入失败');
        },
        getUEContent() {
            // 获取内容方法
            return this.editor.getContent();
        },
        onEditorBlur() {
            //失去焦点事件
        },
        onEditorFocus() {
            //获得焦点事件
        },
        onEditorChange() {
            //内容改变事件
        },
        onEditorReady(editor) {}
    },
    destroyed() {},
    watch: {
        quillcon(val) {
            this.content = val;
        },
        content(val) {
            //设置监听，如果改变就更新 p_model
            this.$emit('update:quillcon', val);
        }
    }
};
</script>
<style lang="scss">
.quillEditorbox {
    .ql-container {
        height: 280px;
        overflow-y: scroll;
    }

    .quillEditorbox .editor {
        line-height: normal !important;
        height: 800px;
    }

    .ql-snow .ql-tooltip[data-mode='link']::before {
        content: '请输入链接地址:';
    }

    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
        border-right: 0px;
        content: '保存';
        padding-right: 0px;
    }

    .ql-snow .ql-tooltip[data-mode='video']::before {
        content: '请输入视频地址:';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
        content: '14px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
        content: '10px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
        content: '18px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
        content: '32px';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
        content: '文本';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
        content: '标题1';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
        content: '标题2';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
        content: '标题3';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
        content: '标题4';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
        content: '标题5';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
        content: '标题6';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
        content: '标准字体';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
        content: '衬线字体';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
        content: '等宽字体';
    }
}
</style>
