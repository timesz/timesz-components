<template>
  <div class="upload_body">
    <div>
      <div class="select_div">
        <div class="file-upload">
          <div class="file-upload-text">选择图片</div>
          <input
            id="upfile"
            ref="fileUpload"
            name="upfile"
            class="file-upload-input"
            type="file"
            accept="image/*"
            @change="changeFile($event)"
          />
        </div>
        <div v-show="startshow" class="startup" @click="startupload">
          {{ uploadText }}
        </div>
      </div>
      <div v-show="preview_show" class="preview_image" @click="delthisimg(0)">
        <img :src="preview_imageurl" />
      </div>
      <!-- <div class="progress_bar">
        <div :class="progressBarDiv" />
      </div> -->
    </div>
    <div v-show="imglist.length > 0" style="margin: 21px 0">
      <div class="moni_text_top">已上传图片,点击下方图片进行删除</div>
      <div v-for="(item, i) in imglist" :key="i" class="del_img">
        <img :src="item.src" @click="delthisimg(item.id)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeszUploadfile",
  props: {
    startshow: { //开始上传按钮是否显示
      type: Boolean,
      default: true,
    },
    uploadText: {//开始上传按钮文本
      type: String,
      default: "开始上传",
    },
    progressBarDiv: { //上传过程进度条样式
      type: String,
      default: "progressBarDiv",
    },
    imglist: { //图片列表
      type: Array,
      default: () => [],
    },
    filekm: { //上传大小限制
      type: String,
      default: "400KB",
    },
  },
  data() {
    return {
      preview_imageurl: "",
      preview_show: false,
    };
  },
  watch: {
    uploadText(val) {
      this.uploadText = val;
    },
    progressBarDiv(val) {
      this.progressBarDiv = val;
    },
    filekm(val) {
      this.filekm = val;
    },
  },
  methods: {
    changeFile(e) {
      this.progressBarDiv = "progressBarDiv";
      var _self = this;
      var inputFile = e.target;
      if (!inputFile.files || inputFile.files.length <= 0) {
        return;
      }
      var file = inputFile.files[0];
      const isJPG = file.type;
      let isLt2M = "";
      if (this.filekm.indexOf("K") != -1) {
        const filelength = this.filekm.split("K")[0];
        isLt2M = file.size / 1024 < filelength;
      } else if (this.filekm.indexOf("M") != -1) {
        const filelength = this.filekm.split("M")[0];
        isLt2M = file.size / 1024 / 1024 < filelength;
      }
      if (isJPG == "image/jpeg" || isJPG == "image/png") {
      } else {
        this.$message.info("上传头像图片只能是 JPG 格式!");
        return false;
      }
      if (!isLt2M) {
        const alertmsg = "上传文件大小不能超过" + this.filekm + "!";
        this.$message.info(alertmsg);
        return false;
      }
      this.uploadText = "开始上传";
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        _self.preview_show = true;
        _self.preview_imageurl = reader.result;
      };
      this.$refs.fileUpload.value = null;
      // 发送事件
      this.$emit("getfile", file);
    },
    delthisimg(id) {
      let text = "确定要删除这个图片吗？";
      if (id) {
      } else {
        text = "取消选中图片？";
      }
      this.$confirm(text, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (id) {
            this.$emit("delfile", id);
          } else {
            this.preview_show = false;
            this.select_imgurl = "";
            this.uploadText = "开始上传";
            this.progressBarDiv = "progressBarDiv";
            this.$emit("getfile", "");
            this.$emit("delfile", 0);
          }
        })
        .catch(() => {});
    },
    //开始上传回调
    startupload() {
      this.$emit("startupload");
    },
  },
};
</script>

<style scoped>
.file-upload {
  width: 100px;
  height: 32px;
  position: relative;
  overflow: hidden;
  border: 1px solid #409eff;
  display: inline-block;
  border-radius: 4px;
  font-size: 12px;
  color: #147a8a;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  font-weight: 400;
  margin-left: -9px;
}

.file-upload-input {
  background-color: transparent;
  position: absolute;
  width: 999px;
  height: 999px;
  top: -10px;
  right: -10px;
  cursor: pointer;
}

/* 图片预览 */
.select_div,
.preview_image {
  height: 210px;
  overflow: hidden;
  display: inline-block;
  width: 145px;
  line-height: 210px;
  text-align: center;
  position: relative;
}

.preview_image img {
  max-height: 200px;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.del_img {
  height: 150px;
  overflow: hidden;
  display: inline-block;
  width: 100px;
  text-align: center;
}

.del_img img {
  max-height: 200px;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.progress_bar {
  height: 19px;
  border-radius: 9px;
  width: 299px;
  overflow: hidden;
  border: 1px solid #ccc;
}
.progressBarDiv {
  background: linear-gradient(
      to right,
      rgba(90, 106, 216, 0),
      rgba(36, 50, 220, 0.5)
    )
    #58c43a;
  animation: animate-stripes 2s linear infinite;
  width: 0;
  border: none;
  height: 100%;
  width: 0px;
  background-size: 30px 30px;
  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.15) 25%,
    rgba(255, 255, 255, 0) 25%,
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    rgba(255, 255, 255, 0) 75%,
    rgba(255, 255, 255, 0) 100%
  );
  background-color: #4169e1;
}

@keyframes width-2 {
  from {
    width: 0px;
  }

  to {
    width: 299px;
  }
}

@keyframes background-position-3 {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%;
  }
}

.torightcss {
  background-color: #4169e1;
  animation: width-2 5s ease normal forwards,
    background-position-3 5s infinite normal forwards,
    progress 2s linear infinite;
  width: 299px;
}

@-webkit-keyframes progress {
  from {
    background-position: -60px -60px;
  }

  to {
    background-position: 0 0;
  }
}

@-moz-keyframes progress {
  from {
    background-position: -60px -60px;
  }

  to {
    background-position: 0 0;
  }
}

@-ms-keyframes progress {
  from {
    background-position: -60px -60px;
  }

  to {
    background-position: 0 0;
  }
}

@-o-keyframes progress {
  from {
    background-position: -60px -60px;
  }

  to {
    background-position: 0px 0;
  }
}

@keyframes progress {
  from {
    background-position: -60px -60px;
  }

  to {
    background-position: 0 0;
  }
}

.startup {
  position: absolute;
  top: 60%;
  width: 100px;
  height: 32px;
  overflow: hidden;
  border: 1px solid #409eff;
  display: inline-block;
  border-radius: 4px;
  font-size: 12px;
  color: #147a8a;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  font-weight: 400;
  left: 22px;
  cursor: pointer;
}

/* .starting{
		background:  linear-gradient(to right, rgba(90, 106, 216, 0), rgba(36, 50, 220, 0.5)) #a75996;
	} */
.success {
  background: #74d04c;
  width: 299px;
}

.error {
  background: #ec4c4c;
  width: 299px;
}

.upload_body {
  min-width: 309px;
  padding: 10px 0;
}
</style>
