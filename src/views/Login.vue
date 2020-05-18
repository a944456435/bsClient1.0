<template>
  <div id="login">
    <van-row>
      <van-nav-bar left-arrow @click-left="goBack" />
    </van-row>
    <van-row class="title">{{isLogin?'登陆':'注册'}}</van-row>

    <van-row class="form">
      <van-col :span="20">
        <el-form
          ref="ruleForm"
          :rules="rules"
          :model="user"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="loginname">
            <el-input v-model="user.loginname"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="username" v-if="isLogin==false">
            <el-input v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="user.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass" v-if="isLogin==false">
            <el-input type="password" v-model="user.checkPass" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </van-col>
    </van-row>

    <van-row class="btn">
      <van-col :span="7"></van-col>
      <van-col :span="10">
        <van-button v-if="isLogin==false" type="primary" block @click="registHandle">注册</van-button>
        <van-button v-else type="primary" block @click="loginHandle">登陆</van-button>
      </van-col>
      <van-col :span="7"></van-col>
    </van-row>
    <van-row v-if="isLogin==true">
      <p type="primary" @click="isLogin=false">
        没有账号，快去
        <a href="javascript:void(0)">{{isLogin?'注册':'登陆'}}</a>
      </p>
    </van-row>
    <van-row v-if="isLogin==false">
      <p type="primary" @click="isLogin=true">
        已有账号，快去
        <a href="javascript:void(0)">{{isLogin?'注册':'登陆'}}</a>
      </p>
    </van-row>
  </div>
</template>
<script>
import { Toast } from "vant";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.user.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.user.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isLogin: true, //判断当前是登陆还是注册
      user: { loginname: "admin", password: "admin" },
      rules: {
        loginname: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        // pass: [
        //     { validator: validatePass, trigger: 'blur' }
        //   ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ required: true, message: "请输入昵称", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions("user", ["login", "registOrUpdate"]),
    goBack() {
      this.$router.go(-1);
    },
    loginHandle() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.login(this.user).then(res => {
            console.log(res, "=====");
            if (res.status === 200) {
              this.$router.push("/");
            } else {
              Toast("账号或密码错误，请重新输入！");
            }
          });
        } else {
          Toast("信息校验失败，请重新输入！");

          return false;
        }
      });
    },
    registHandle() {
      let payload = {
        username: this.user.username,
        loginname: this.user.loginname,
        password: this.user.password,
        photo: this.user.photo,
        Email: this.user.Email,
        city: this.user.city,
        registrationTime: new Date().valueOf(),
        sex: this.user.sex
      };
      console.log("payload:", payload);

      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.registOrUpdate(payload).then(reslut => {
            if (reslut.statusText != "success") {
              this.$toast("登陆名已经注册过！");
            } else {
              this.$toast("注册成功，请重新登陆！");
              this.isLogin = true;
            }
          });
        } else {
          this.$toast("信息校验失败！");
          return false;
        }
      });
    }
  }
};
</script>

<style  scoped>
#login {
  background-image: url("../assets/3.jpg");
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-size: cover;
  /* background-repeat: repeat-y; */
}
.bgimg {
  position: absolute;
}
.title {
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
}
.form {
  margin-top: 120px;
}

.user {
  margin-top: 50px;
  margin-bottom: 30px;
}
.u—name {
  margin-bottom: 30px;
}
.btn {
  margin-top: 70px;
}
</style>