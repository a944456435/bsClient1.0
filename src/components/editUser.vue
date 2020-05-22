<template>
  <div id="editUser">
    <van-row>
      <van-nav-bar
        title="我的资料"
        left-arrow
        @click-left="goBack"
        right-text="完成"
        @click-right="toSave"
      />
    </van-row>
    <el-row>
      <el-col>
        <el-upload
          class="avatar-uploader"
          action="/api/upload/uploadImg"
          name="fileimg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="user_info.photo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon icon-push"></i>
        </el-upload>
        <i style="font-size:.8rem">点击更换头像</i>
      </el-col>
    </el-row>
    <!-- {{form}} -->
    <el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <van-cell-group title="基本信息" class="my">
        <el-row class="username" :gutter="10">
          <el-col :span="3">昵称</el-col>
          <el-col :span="19">
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="请输入昵称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <van-icon name="arrow" size="18" />
          </el-col>
        </el-row>

        <el-row class="username" :gutter="10">
          <el-col :span="3">性别</el-col>
          <el-col :span="19">
            <el-form-item prop="sex">
              <el-select v-model="form.sex" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <van-icon name="arrow-down" size="18" />
          </el-col>
        </el-row>

        <el-row class="username" :gutter="10">
          <el-col :span="3">邮箱</el-col>
          <el-col :span="19">
            <el-form-item prop="Email">
              <el-input v-model="form.Email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <van-icon name="arrow" size="18" />
          </el-col>
        </el-row>

        <el-row class="username" :gutter="10">
          <el-col :span="3">城市</el-col>
          <el-col :span="19">
            <el-form-item prop="city">
              <el-input v-model="form.city" placeholder="请输入城市"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <van-icon name="arrow" size="18" />
          </el-col>
        </el-row>

        <el-row class="username" :gutter="10">
          <el-col :span="3">年龄</el-col>
          <el-col :span="19">
            <el-form-item prop="age">
              <el-input v-model.number="form.age" placeholder="请输入年龄"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <van-icon name="arrow" size="18" />
          </el-col>
        </el-row>
      </van-cell-group>

      <van-cell-group title="安全信息" class="my">
        <el-row class="username" :gutter="10">
          <el-col :span="3">密码</el-col>
          <el-col :span="19">
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="form.password"
                autocomplete="off"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <van-icon name="arrow" size="18" />
          </el-col>
        </el-row>

        <el-row class="username" :gutter="10">
          <el-col :span="3">确认</el-col>
          <el-col :span="19">
            <el-form-item prop="checkPass">
              <el-input
                type="password"
                autocomplete="off"
                v-model="form.checkPass"
                @input="change($event)"
                placeholder="请确认密码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <van-icon name="arrow" size="18" />
          </el-col>
        </el-row>
      </van-cell-group>

      <van-cell-group title="更多信息" class="my">
        <el-row class="username" :gutter="10">
          <el-col :span="3">职业</el-col>
          <el-col :span="19">
            <el-form-item prop="occupation">
              <el-input v-model="form.occupation" placeholder="请输入职业"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <van-icon name="arrow" size="18" />
          </el-col>
        </el-row>
        <el-row class="username jianjie" :gutter="10">
          <el-col :span="3">简介</el-col>
          <el-col :span="19">
            <el-form-item prop="description">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.description"
                maxlength="30"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <van-icon name="arrow" size="18" />
          </el-col>
        </el-row>
      </van-cell-group>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    //表单密码验证回调函数
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass != "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      username: "", //用户昵称
      imageUrl: "", //上传头像的url
      form: {}, //修改用户资料的信息
      checkPass: "",
      //性别选择
      options: [
        {
          value: "null",
          label: "不公开"
        },
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],
      //表单验证规则
      rules: {
        username: [
          { required: true, message: "昵称不为空", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1到 10 个字符", trigger: "blur" }
        ],
        city: [
          { min: 2, max: 6, message: "长度在 2到 6 个字符", trigger: "blur" }
        ],
        age: [
          { type: "number", message: "年龄必须为数字值", trigger: "change" }
        ],
        Email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState("user", ["user_info"])
  },
  methods: {
    ...mapActions("user", ["registOrUpdate", "findUserById"]),
    goBack() {
      this.$router.go(-1);
    },
    change(e) {
      this.$forceUpdate();
    },
    //保存用户信息修改
    toSave() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.form.id = this.user_info.id;
          console.log("表单的数据", this.form);
          this.registOrUpdate(this.form);
          Toast("修改成功！");
        } else {
          Toast("信息校验失败，请重新输入！");
          return false;
        }
      });
    },

    //图片上传成功回调
    async handleAvatarSuccess(res, file) {
      console.log("success upload");
      this.imageUrl = await URL.createObjectURL(file.raw);
      console.log("上传成功的地址", res.data[0].url);
      //把当前预览的头像换成上传成功的
      this.imageUrl = res.data[0].url;
      //把上传成功后的头像放进数据库，执行用户修改操作
      this.form.photo = this.imageUrl;
      this.toSave();
      this.findUserById();
    }
  },
  created() {
    this.imageUrl = this.user_info.photo || "";
    //把用户信息放到表单中初始化显示，重复密码也要放进去
    this.form = this.user_info;
    this.form.checkPass = this.user_info.password;
  }
};
</script>

<style >
#editUser {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 100;
  background-color: #f0f0f4;
}

.avatar-uploader {
  width: 3rem;
  height: 3rem;
  border: 1px solid #ccc;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
}
.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
#editUser .block {
  margin-top: 0.5rem;
}
#editUser .my {
  padding: 0 28px;
  background-color: #ffffff;
  text-align: left;
}
#editUser .jianjie {
  height: 50px !important;
}
.icon-push {
  font-size: 26px;
  margin-top: 10px;
}
#editUser .el-input__inner {
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
}
#editUser .el-textarea__inner {
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
}
#editUser .el-form-item__content {
  margin-left: 0 !important;
}
</style>