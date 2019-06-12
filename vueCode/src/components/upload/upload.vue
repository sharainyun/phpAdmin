<template>
	<div class="vue-upload-file" v-show="value">
		<div class="vuf-drop-area" @click="handleClick" @dragleave="handleDragleave" @dragover="handleDragover" @dragenter="handleDragenter" @drop="handleDrop">
			<i class="vuf-icon1" v-show="loading != 1">
				<i class="vuf-icon1-arrow"></i>
				<i class="vuf-icon1-body"></i>
				<i class="vuf-icon1-bottom"></i>
			</i>
			<span class="vuf-hint" v-show="loading !== 1">{{ lang.hint }}</span>
			<span class="vuf-loading" v-show="loading === 1">{{ lang.loading }}</span>
			<div class="vuf-progress-wrap" v-show="loading === 1">
				<span class="vuf-progress" :style="progressStyle"></span>
			</div>
			<span class="vuf-no-supported-hint" v-show="!isSupported">{{ lang.noSupported }}</span>
			<input id="fileinput" name="file" type="file" v-show="false" @change="handleChange" ref="fileinput">
		</div>
		<div class="vuf-error" v-show="hasError">
			<i class="vuf-icon2"></i>
			{{ errorMsg }}
		</div>
		<div class="vuf-success" v-show="loading === 2">
			<i class="vuf-icon3"></i>
			{{ lang.success }}
		</div>
	</div>
</template>

<script>
'use strict';
import Cookies from 'js-cookie';
export default {
	props: {
		// 域，上传文件name，触发事件会带上（如果一个页面多个图片上传控件，可以做区分
		field: {
			type: String,
			'default': 'upload'
		},
		// 类似于id，触发事件会带上（如果一个页面多个图片上传控件，可以做区分
		keys: {
			'default': 0
		},
		// 显示该控件与否
		value: {
			'default': true
		},
		url: {
			type: String,
			'default': ''
		},
		// 其他要上传文件附带的数据，对象格式
		params: {
			'default': null
		},
		// 单文件大小限制
		maxSize: {
			'default': 2048
		},
		// 仅限图片
		onlyImg: {
			'default': false
		},
		// 仅限单文件上传
		onlySingle: {
			'default': false
		},
		// 语言包
		langType: {
			type: String,
			'default': 'zh'
		},
		// 语言扩展
		langExt: {
			type: Object,
			'default': null
		}
	},
	data() {
		let that = this,
			{ langExt, langType } = that,
			isSupported = true,
			langBags = {
				zh: {
					hint: '点击，或将文件拖动至此处',
					loading: '正在上传……',
					noSupported: '浏览器不支持该功能，请使用IE10以上或其他现代浏览器！',
					success: '上传成功',
					fail: '上传失败',
					error: {
						onlyImg: '仅限图片格式',
						onlySingle: '仅限单文件上传',
						outOfSize: '单文件大小不能超过 ',
					}
				},
				en: {
					hint: 'Click, or drag the file here',
					loading: 'Uploading……',
					noSupported: 'Browser does not support, please use IE10+ or other browsers',
					success: 'Upload success',
					fail: 'Upload failed',
					error: {
						onlyImg: 'Images only',
						onlySingle: 'Single file only',
						outOfSize: 'File exceeds size limit: '
					}
				}
			},
			lang = langBags[langType] ? langBags[langType] : langBags['zh'];
		if (langExt) {
			Object.assign(lang, langExt);
		}
		if (typeof FormData != 'function') {
			isSupported = false;
		}
		return {
			loading: 0, //0未开始 1正在 2成功 3错误
			lang,
			isSupported,
			hasError: false,
			files: '',
			progress: 0,
			errorMsg: ''
		}
	},
	computed: {
		progressStyle() {
			let { progress } = this;
			return {
				width: progress + '%'
			}
		}
	},
	watch: {
		'value': function(newValue) {
			if (newValue) {
				this.reset();
			}
		}
	},
	methods: {
		handleDragleave(e) {
			e.preventDefault();
		},
		handleDrop(e) {
			e.preventDefault();
			if (this.loading !== 1) {
				let files = e.dataTransfer.files;
				this.reset();
				if (this.checkFiles(files)) {
					this.upload(files);
				}
			}
		},
		handleDragenter(e) {
			e.preventDefault();

		},
		handleDragover(e) {
			e.preventDefault();

		},
		handleClick(e) {
			if (this.loading !== 1) {
				if (e.target !== this.$refs.fileinput) {
					e.preventDefault();
					this.$refs.fileinput.click();
				}
			}
		},
		handleChange(e) {
			if (this.loading !== 1) {
				let files = e.target.files;
				this.reset();
				if (this.checkFiles(files)) {
					this.upload(files);
				}
			}
		},
		checkFiles(files) {
			let that = this,
				{ lang, maxSize, onlyImg, onlySingle } = that,
				fileNum = files.length;
			// 是否文件为空
			if (fileNum == 0) {
				return false;
			}

			// 仅限单文件？
			if (onlySingle && fileNum > 1) {
				that.hasError = true;
				that.errorMsg = lang.error.onlySingle;
				return false;
			}

			for (let i = 0; i < fileNum; i++) {
				// 仅限图片
				if (onlyImg && files[i].type.indexOf('image') === -1) {
					that.hasError = true;
					that.errorMsg = lang.error.onlyImg;
					return false;
				}

				// 超出大小
				if (files[i].size / 1024 > maxSize) {
					that.hasError = true;
					that.errorMsg = lang.error.outOfSize + maxSize + 'kb';
					return false;
				}
			}
			return true;
		},
		reset() {
			let that = this;
			that.loading = 0;
			that.hasError = false;
			that.errorMsg = '';
			that.progress = 0;
		},
		upload(files) {
			let that = this,
				{ url, params, onlySingle, field, keys, lang } = this,
				fmData = new FormData();

			// 判断是否单文件
			if (onlySingle) {
				fmData.append(field, files[0]);
			} else {
				fmData.append(field, files);
			}

			// 添加其他参数
			if (typeof params == 'object' && params) {
				Object.keys(params).forEach((k) => {
					fmData.append(k, params[k]);
				})
			}

			// 监听进度回调
			const uploadProgress = function(event) {
				if (event.lengthComputable) {
					that.progress = 100 * Math.round(event.loaded) / event.total;
				}
			};

			// 上传文件
			that.loading = 1;
			new Promise(function(resolve, reject) {
				let client = new XMLHttpRequest();
				client.open('post', url, true);
				client.onreadystatechange = function() {
					if (this.readyState !== 4) {
						return;
					}
					if (this.status === 200) {
						resolve(JSON.parse(this.responseText));
					} else {
						reject(this.status);
					}
				};
                client.withCredentials = true;
				client.setRequestHeader('Authorization', Cookies.get('token'));
				client.upload.addEventListener("progress", uploadProgress, false); //监听进度
				client.send(fmData);
			}).then(
				// 上传成功
				function(resData) {
					that.loading = 2;
					that.$emit('uploadSuccess', resData, field, keys);
					document.getElementById('fileinput').value = '';
				},
				// 上传失败
				function(sts) {
					that.loading = 3;
					that.hasError = true;
					that.errorMsg = lang.fail;
					that.$emit('uploadFail', sts, field, keys);
					document.getElementById('fileinput').value = '';
				}
				);
		}
	}
}

</script>

<style lang="less" scoped>
@-webkit-keyframes vue_upload_progress {
	0% {
		background-position: 0 0;
	}
	100% {
		background-position: 10px 0;
	}
}

@keyframes vue_upload_progress {
	0% {
		background-position: 0 0;
	}
	100% {
		background-position: 10px 0;
	}
}

@-webkit-keyframes vue_upload {
	0% {
		opacity: 0;
		-webkit-transform: scale(0) translatey(-60px);
		transform: scale(0) translatey(-60px);
	}
	100% {
		opacity: 1;
		-webkit-transform: scale(1) translatey(0);
		transform: scale(1) translatey(0);
	}
}

@keyframes vue_upload {
	0% {
		opacity: 0;
		-webkit-transform: scale(0) translatey(-60px);
		transform: scale(0) translatey(-60px);
	}
	100% {
		opacity: 1;
		-webkit-transform: scale(1) translatey(0);
		transform: scale(1) translatey(0);
	}
}

.vue-upload-file {
	position: absolute;
	display: block;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	z-index: 999;
	left: 50%;
	margin-top: 12px;
	margin-left: -140px;
	padding: 12px 16px;
	width: 280px;
	background-color: #fff;
	-webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
	box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
	border-top: 2px solid rgba(0, 0, 0, 0.8);
	-webkit-animation: vue_upload 0.15s ease-in;
	animation: vue_upload 0.15s ease-in;
}

.vue-upload-file::before {
	position: absolute;
	content: '';
	top: -8px;
	left: 132px;
	width: 0;
	height: 0;
	border-bottom: 7px solid rgba(0, 0, 0, 0.8);
	border-left: 7px solid transparent;
	border-right: 7px solid transparent;
}

.vue-upload-file .vuf-drop-area {
	position: relative;
	padding: 10px;
	height: 60px;
	background-color: rgba(0, 0, 0, 0.03);
	text-align: center;
	border: 1px dashed #ddd;
}

.vue-upload-file .vuf-drop-area .vuf-icon1 {
	display: block;
	margin: 0 auto 6px;
	width: 32px;
	height: 32px;
	overflow: hidden;
}

.vue-upload-file .vuf-drop-area .vuf-icon1 .vuf-icon1-arrow {
	display: block;
	margin: 0 auto;
	width: 0;
	height: 0;
	border-bottom: 11.2px solid #999;
	border-left: 11.2px solid transparent;
	border-right: 11.2px solid transparent;
}

.vue-upload-file .vuf-drop-area .vuf-icon1 .vuf-icon1-body {
	display: block;
	width: 9.6px;
	height: 11.2px;
	margin: 0 auto;
	background-color: #999;
}

.vue-upload-file .vuf-drop-area .vuf-icon1 .vuf-icon1-bottom {
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	display: block;
	height: 9.6px;
	border: 5px solid #999;
	border-top: none;
}

.vue-upload-file .vuf-drop-area .vuf-hint {
	font-size: 14px;
	color: #999;
	line-height: 30px;
}

.vue-upload-file .vuf-drop-area .vuf-loading {
	font-size: 16px;
	color: #999;
	line-height: 30px;
}

.vue-upload-file .vuf-drop-area .vuf-progress-wrap {
	display: block;
	background-color: rgba(0, 0, 0, 0.14);
}

.vue-upload-file .vuf-drop-area .vuf-progress-wrap .vuf-progress {
	position: relative;
	margin-top: 12px;
	display: block;
	height: 3px;
	background-color: #4a7;
	-webkit-box-shadow: 0 1px 3px 0 rgba(68, 170, 119, 0.3);
	box-shadow: 0 1px 3px 0 rgba(68, 170, 119, 0.3);
	-webkit-transition: width 0.5s ease;
	transition: width 0.5s ease;
	background-image: -webkit-linear-gradient(135deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
	background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
	background-size: 10px 10px;
	-webkit-animation: vue_upload_progress 0.3s linear infinite;
	animation: vue_upload_progress 0.3s linear infinite;
}

.vue-upload-file .vuf-drop-area .vuf-progress-wrap .vuf-progress::after {
	content: '';
	position: absolute;
	display: block;
	top: -2px;
	right: -2px;
	width: 5px;
	height: 5px;
	border: 1px solid rgba(255, 255, 255, 0.6);
	-webkit-box-shadow: 0 1px 4px 0 rgba(68, 170, 119, 0.7);
	box-shadow: 0 1px 4px 0 rgba(68, 170, 119, 0.7);
	border-radius: 100%;
	background-color: #4a7;
}

.vue-upload-file .vuf-drop-area .vuf-no-supported-hint {
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	padding: 10px 0;
	width: 100%;
	height: 60px;
	line-height: 30px;
	background-color: #eee;
	text-align: center;
	color: #888;
	font-size: 14px;
}

.vue-upload-file .vuf-drop-area:hover {
	cursor: pointer;
	border-color: #ccc;
	background-color: rgba(0, 0, 0, 0.06);
}

.vue-upload-file .vuf-drop-area:hover .vuf-hint {
	color: #777;
}

.vue-upload-file .vuf-error,
.vue-upload-file .vuf-success {
	display: block;
	font-size: 14px;
	line-height: 24px;
	height: 24px;
	color: #d10;
	text-align: center;
	vertical-align: top;
}

.vue-upload-file .vuf-success {
	color: #4a7;
}

.vue-upload-file .vuf-icon3 {
	position: relative;
	display: inline-block;
	width: 20px;
	height: 20px;
	top: 4px;
}

.vue-upload-file .vuf-icon3::after {
	position: absolute;
	top: 3px;
	left: 6px;
	width: 6px;
	height: 10px;
	border-width: 0 2px 2px 0;
	border-color: #4a7;
	border-style: solid;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
	content: '';
}

.vue-upload-file .vuf-icon2 {
	position: relative;
	display: inline-block;
	width: 20px;
	height: 20px;
	top: 4px;
}

.vue-upload-file .vuf-icon2::after,
.vue-upload-file .vuf-icon2::before {
	content: '';
	position: absolute;
	top: 9px;
	left: 4px;
	width: 13px;
	height: 2px;
	background-color: #d10;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
}

.vue-upload-file .vuf-icon2::after {
	-webkit-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	transform: rotate(-45deg);
}
</style>
