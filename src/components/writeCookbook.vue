<template>
  <div class="writeCookbook">
    <van-nav-bar title="发布菜谱" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="content">
      <!-- 效果图 -->
      <div class="xgt">
        <!-- 原生输入框上传图片 -->
        <van-row>
          <div class="imgInput">
            <van-icon name="add-o" size="3rem" class="add-o" />
            <input class="xgtImg" type="file" @change="xgtUpload" />
            <img src class="topimg" />
          </div>
        </van-row>
        <div>添加菜谱效果图（选填）</div>
      </div>

      <div class="form">
        <!-- 菜谱分类 -->
        <van-row>
          <p>菜谱分类</p>
        </van-row>
        <van-row>
          <div class="category">
            菜谱类别：
            <el-select v-model="selectCategory" placeholder="请选择">
              <el-option
                v-for="item in categorys"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </van-row>
        <!-- 菜谱名 -->
        {{cook}}
        <van-row>
          <p class="label">菜谱名(必填)</p>
        </van-row>
        <van-row>
          <van-field
            class="inp"
            v-model="cook.name"
            name="用户名"
            placeholder="菜谱名"
            :rules="[{ required: true, message: '请填写菜谱名' }]"
          />
        </van-row>
        <van-row>
          <p class="label">菜谱描述(必填)</p>
        </van-row>
        <van-row>
          <van-field
            class="inp"
            v-model="cook.detail"
            name="用户名"
            placeholder="菜谱信息"
            :rules="[{ required: true, message: '请填写菜谱信息' }]"
          />
        </van-row>
        <!-- 用料 -->
        <!-- <p>ingredients{{ingredients}}</p>
        ingre{{ingre}}-->
        <van-row>
          <p class="label">用料</p>
        </van-row>
        <van-row>
          <van-col :span="12">食材名称</van-col>
          <van-col :span="12">食材用量</van-col>
        </van-row>
        <van-row class="num_info" v-for="i in y_num" :key="i / 10" :gutter="3">
          <van-col :span="12">
            <van-field
              class="inp"
              v-model="ingre.names[i - 1]"
              name="食材名称"
              placeholder="食材名称"
              :rules="[{ required: true, message: '请填写食材名称' }]"
            />
          </van-col>
          <van-col :span="12">
            <van-field
              class="inp"
              v-model="ingre.nums[i - 1]"
              name="用户名"
              placeholder="食材用量"
              :rules="[{ required: true, message: '请填写食材用量' }]"
            />
          </van-col>
        </van-row>
        <van-row>
          <van-col :span="4">
            <div class="push" @click="addInput">
              <van-icon name="plus" size="20" />
            </div>
          </van-col>
          <van-col class="pushText">添加步骤</van-col>
        </van-row>

        <!--做法步骤表  -->
        <!-- cookStep{{cookStep}} -->
        <van-row class="label zf_title">做法步骤(至少{{ z_num }}步)</van-row>
        <div v-for="(i, index) in z_num" :key="i">
          <van-field
            class="inp zfk"
            label-width="1.5rem"
            v-model="practice.texts[i - 1]"
            name="用户名"
            :label="i"
            placeholder="不需要填写步骤序号1、2、3"
            :rules="[{ required: true, message: '请填写具体步骤' }]"
          />
          <!-- <van-uploader
            v-model="fileLists.images[i-1]"
            :max-count="1"
            preview-size="100px"
            :after-read="afterRead"
            upload-text="可以添加步骤图"
          />-->
          <!-- 原生输入框上传图片 -->
          <van-row>
            <div class="imgInput">
              <!-- <div class="imgInput"></div> -->
              <van-icon name="add-o" size="3rem" class="add-o" />
              <input class="bztImg" type="file" name="images" @change="afterRead(index)" />
              <img src class="img" />
            </div>
          </van-row>
        </div>
        <van-row class="lastPush">
          <van-col :span="3">
            <div class="push" @click="addInput2">
              <van-icon name="plus" size="20" />
            </div>
          </van-col>
          <van-col class="pushText">添加步骤</van-col>
        </van-row>
        <!-- </van-form> -->
        <!-- 提交按钮 -->
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          class="submit"
          @click="toSubmitHandle"
        >提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify, Toast } from "vant";
import { mapActions, mapState } from "vuex";
import { upload } from "@/http/axios";
import { getSession } from "../utils/sessionStorage";
export default {
  data() {
    return {
      value: "",
      showPicker: false,
      xgtImgURL: "", //效果图地址
      //菜谱所有分类
      selectCategory: 7, //选择的类别,默认为7，其它类型
      images: [], //步骤图数组
      cookbook: {},
      y_num: 1, //用料输入框的行量
      z_num: 1, //做法步骤框
      cook: {
        name: "",
        detail: ""
      },
      ingre: {
        names: [],
        nums: []
      },
      practice: {
        texts: []
      }
    };
  },
  computed: {
    ...mapState("cookbook", ["lastCookId", "newCookbook"]),
    ...mapState("category", ["categorys"]),
    ...mapState("ingredients", ["ingredients"]),
    ...mapState("practice", ["cookStep"])
  },
  methods: {
    ...mapActions("cookbook", ["toSubmitCookbook", "findCookbookById"]),
    ...mapActions("ingredients", ["saveOrUpdateIngre", "getIngredients"]),
    ...mapActions("practice", ["saveOrUpdateStep", "showCookStep"]),
    ...mapActions("category", ["findAllCategory"]),
    //效果图 图片上传
    async xgtUpload() {
      let img1 = document.querySelector(".xgtImg").files[0];
      //图片上传后预览
      var createObjectURL = function(blob) {
        return window[window.webkitURL ? "webkitURL" : "URL"][
          "createObjectURL"
        ](blob);
      };
      var newimgdata1 = createObjectURL(img1);
      document.querySelector(".topimg").src = newimgdata1;

      var formdata = new FormData();
      formdata.append("fileimg", img1);
      let response = await upload("/upload/uploadImg", formdata);
      this.xgtImgURL = await response.data[0].url;
      console.log("效果图上传结果", response, this.xgtImgURL);
    },

    //步骤图片上传  //等按提交在进行上传
    async afterRead(i) {
      let img = document.querySelectorAll(".bztImg")[i].files[0];
      console.log("第" + i + 1 + "张图", img);
      //图片上传后预览
      var createObjectURL = function(blob) {
        return window[window.webkitURL ? "webkitURL" : "URL"][
          "createObjectURL"
        ](blob);
      };
      var newimgdata = createObjectURL(img);
      document.querySelectorAll("img.img")[i].src = newimgdata;

      var formdata = new FormData();
      formdata.append("fileimg", img);
      formdata.append("imgArrIndex", i);
      let response = await upload("/upload/uploadImg", formdata);
      let imgIndex = response.data[0].Sort;
      let imgUrl = response.data[0].url;
      this.images[imgIndex] = imgUrl;
      console.log("步骤数组", this.images);
    },

    async toSubmitHandle() {
      //0、判断表单输入格式
      if (this.ingre.names.length != this.ingre.nums.length) {
        this.$toast("格式错误！");
        return;
      }
      //1、添加到cookbook的表中
      //拿到分类
      let category_id = this.category;
      //当前发布时间戳
      let time = new Date().valueOf();
      //拿到菜谱名
      let name = this.cook.name;
      //菜谱id，当修改时存在
      let id = this.cook.id;
      //描述信息
      let detail = this.cook.detail;
      //用户id通过后台session拿到
      //效果图
      let image = this.xgtImgURL;
      let payload1 = { category_id, id, time, name, detail, image };
      console.log("添加到cookbook表中的信息", payload1);
      await this.toSubmitCookbook(payload1); //等待拿到cookbook的主键id

      //2、添加到用料表中
      //拿到添加用料给哪个菜谱的cook_id
      var cook_id = this.lastCookId;
      console.log("当前添加菜谱的自增id", cook_id);
      if (cook_id != undefined && cook_id != "") {
        //拿到食材和对应的用量
        //循环把所有食材和对应用量添加进去

        let arrLen = this.ingre.names.length;
        for (var i = 0; i < arrLen; i++) {
          var temArr = { name: "", number: "", cook_id: "" };
          temArr.name = this.ingre.names[i];
          temArr.number = this.ingre.nums[i];
          temArr.cook_id = cook_id;
          console.log("temArr", temArr);
          this.saveOrUpdateIngre(temArr);

          console.log("食材存入成功！");
        }

        //3、添加步骤
        //拿到步骤
        let parcticeArr = this.practice.texts; //[1,2,3]
        //拿到步骤图片
        // this.images;[url1,null,rul2]
        console.log("步骤信息：：", parcticeArr, this.images);
        //把步骤和步骤图对应结合起来
        for (var i = 0; i < parcticeArr.length; i++) {
          var parctice_row = {
            step: i + 1,
            text: parcticeArr[i],
            images: this.images[i],
            cook_id
          };
          console.log("步骤表要添加进来的一条步骤", parctice_row);
          //调用添加步骤接口
          this.saveOrUpdateStep(parctice_row).then(() => {
            Notify({ type: "success", message: "发布成功！" });
            //成功后返回首页
            this.$router.push("/");
          });
        }
      }
    },
    //分类选择
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    //增加用料输入框
    addInput() {
      this.y_num++;
    },
    //增加步骤框
    addInput2() {
      this.z_num++;
    },
    //校验
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    }
  },
  created() {
    this.findAllCategory();
    //从修改按钮处过来
    if (this.$route.query.Cook_id) {
      Toast("修改");
      //把上次过来修改的信息清空
      this.ingre.names = [];
      this.ingre.nums = [];
      this.practice.texts = [];
      this.findCookbookById(this.$route.query.Cook_id).then(() => {
        //图片预览
        document.querySelector(".topimg").src = this.newCookbook[0].image;

        //菜谱类别
        this.selectCategory = this.newCookbook[0].category_id || 7;
        //菜谱名、描述、id、类别
        this.cook = this.newCookbook[0];
        this.cook.id = this.newCookbook[0].id;
        this.cook.category_id = this.selectCategory;

        //得到用料信息
        this.getIngredients(this.newCookbook[0].id).then(() => {
          this.ingredients.filter((item, index) => {
            this.ingre.names[index] = item.name;
            this.ingre.nums[index] = item.number;
          });
          //强制更新
          this.$forceUpdate();
        });

        //得到步骤信息
        this.showCookStep(this.newCookbook[0].id).then(() => {
          this.cookStep.filter((item, index) => {
            this.practice.texts[index] = item.text;
            document.querySelector(".img").src = item.images;
          });
          //强制更新
          this.$forceUpdate();
        });
      });
    }
  }
};
</script>

<style scoped>
.content {
  margin-top: 30px;
  background-color: white;
  /* margin-bottom: 70px; */
  position: absolute;
  z-index: 100;
}

.xgt {
  margin: 0 auto;
}
.category {
  text-align: left;
}
.form {
  width: 96%;
  margin: 0 auto 10px;
}
.label {
  text-align: left;
  text-indent: 2rem;
  font-weight: 600;
}
.inp {
  border: 1px solid #ccc;
  border-radius: 1rem;
}
.num_info {
  margin-bottom: 8px;
}
.push {
  width: 30px;
  height: 30px;
  margin: 0 auto;
  display: flex;
  border: 1px solid #ccc;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
.zf_title {
  margin-top: 25px;
}
.zfk {
  margin: 5px 0;
}
.imgInput {
  width: 6rem;
  margin-left: 2rem;
  height: 6rem;
  /* border: 1px solid #ccc; */
  position: relative;
  background-color: white;
}
.imgInput > .add-o {
  position: absolute;
  top: 1.6rem;
  left: 1.5rem;
  opacity: 0.3;
  /* margin-top: 2rem; */
}
.imgInput > input[type="file"] {
  position: absolute;
  top: 2rem;
  left: 0.8rem;
  opacity: 0;
}
.imgInput > img {
  width: 6rem;
  height: 6rem;
}
.lastPush {
  padding: 0.5rem;
}
.pushText {
  font-size: 0.9rem;
  color: #ccc;
}
.submit {
  margin-top: 12px;
}
</style>
