<template>
    <div class="tinymce-container editor-container">
        <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
    </div>
</template>
<script>
import plugins from './plugins'
import toolbar from './toolbar'
// import uploadImage from '_utils/editImageUpload'
export default {
    name: 'TinyMce',
    components: {},
    props: {
        id: {
            type: String
        },
        value: {
            type: String,
            default: ''
        },
        toolbar: {
            type: Array,
            required: false,
            default() {
                return []
            }
        },
        menubar: {
            default: 'file edit insert view format table'
        },
        height: {
            type: Number,
            required: false,
            default: 400
        }
    },
    data() {
        return {
            // setContent队列
            setContentCallArr: [],
            inited: false,
            tinymceId: this.id || 'vue-tinymce-' + +new Date(),
            accept: ['jpg', 'jpeg', 'png', 'gif']
        }
    },
    watch: {
        value: function(newValue, oldValue) {
            // if v-model content change programmability
            if (this.objTinymce && this.value !== this.objTinymce.getContent()) {
                this.objTinymce.setContent(this.value)
            }
        }
    },
    mounted() {
        this.initTinymce()
    },
    activated() {
        if (this.inited) {
            this.initTinymce()
        }
    },
    deactivated() {
        this.destroyTinymce()
    },
    methods: {
        initTinymce() {
            const _this = this
            window.tinymce.init({
                selector: `#${this.tinymceId}`,
                language: 'zh_CN',
                height: this.height,
                body_class: 'panel-body ',
                convert_urls: false, // 不自动转换文件地址路径
                object_resizing: false,
                toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
                menubar: this.menubar,
                plugins: plugins,
                end_container_on_empty_block: true,
                powerpaste_word_import: 'clean',
                code_dialog_height: 450,
                code_dialog_width: 1000,
                advlist_bullet_styles: 'square',
                advlist_number_styles: 'default',
                imagetools_cors_hosts: ['http://cms.yescia.com'],
                default_link_target: '_blank',
                link_title: false,
                images_upload_base_path: 'http://cms.yescia.com',
                images_upload_handler: function(blobInfo, success, failure) {
                    // 自定义图片上传
                    // uploadImage({ file: blobInfo.blob(), param: { name: blobInfo.filename() }}).then(res => {
                    //     if (res.url) {
                    //         console.log('图片上传成功' + res.url)
                    //         success(res.url)
                    //     } else {
                    //         failure()
                    //     }
                    // }).catch(Error => {
                    //     failure(Error)
                    // })
                    // uploadFile({ url: '/attachment/upload-file', file: file, param: this.uploadQuery }).then(res => {
                    // })
                },
                init_instance_callback: editor => {
                    _this.inited = true
                    editor.on('NodeChange Change KeyUp SetContent', () => {
                        _this.updateValue(editor.getContent())
                    })
                    editor.setContent(this.value)
                    _this.objTinymce = editor
                    _this.initedCallback()
                }
            })
        },
        destroyTinymce() {
            if (window.tinymce.get(this.tinymceId)) {
                window.tinymce.get(this.tinymceId).destroy()
            }
        },
        // 定时任务，判断初始化完成后，执行setContent callback
        initedCallback: function() {
            if (this.setContentCallArr.length > 0) {
                this.setContentCallArr.forEach((item, idx) => {
                    item()
                })
                this.setContentCallArr = null
            }
        },
        setContent(value) {
            // this.$emit('input', this.getContent())\
            if (this.inited) {
                window.tinymce.get(this.tinymceId).setContent(value)
            } else {
                this.setContentCallArr.push(() => {
                    window.tinymce.get(this.tinymceId).setContent(value)
                })
            }
        },
        async getContent() {
            return window.tinymce.get(this.tinymceId).getContent()
        },
        updateValue(value) {
            this.$emit('input', value)
        },
        imageSuccessCBK(arr) {
            const _this = this
            arr.forEach(v => {
                window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
            })
        }
    },
    destroyed() {
        this.destroyTinymce()
    }
}

</script>
<style scoped>
.tinymce-container {
    position: relative;
}

.tinymce-container>>>.mce-fullscreen {
    z-index: 10000;
}

.tinymce-textarea {
    visibility: hidden;
    z-index: -1;
}

.editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
    /*z-index: 2005;*/
}

.editor-upload-btn {
    display: inline-block;
}

</style>
