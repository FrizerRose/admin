<template>
  <a-row
    type="flex"
    justify="center"
  >
    <a-col :span="6">
      <h2>Please Login</h2>

      <div class="login-box">
        <form action="">
          <a-alert
            v-if="formError"
            :message="formErrorMsg"
            type="error" />

          <a-input
            v-model:value="userEmail"
            placeholder="email"
          />

          <a-input-password
            v-model:value="userPassword"
            placeholder="input password"
          />
          <a-button
            value="large"
            type="primary"
            @click="save"
          >
            Login
          </a-button>
        </form>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import firebase from 'firebase';

export default defineComponent({
  // components: {
  // },
  setup() {
    const userEmail = ref('');
    const userPassword = ref('');
    const formError = ref(false);
    const formErrorMsg = ref('');

    function save() {
      firebase
        .auth()
        .signInWithEmailAndPassword(userEmail.value, userPassword.value)
        .then(() => {
          formError.value = false;
          window.location.href = '/';
        })
        .catch((error) => {
          formError.value = true;
          formErrorMsg.value = error.message;
          // if (error.code === 'auth/wrong-password') {
          //   console.log('Wrong password.');
          // } else {
          // }
          console.log(error);
        });
    }

    return {
      save,
      userEmail,
      userPassword,
      formError,
      formErrorMsg,
    };
  },
});
</script>
<style scoped lang="css">
.login-box {
  padding: 20px;
  box-shadow: 0 12px 5px -10px rgb(0 0 0 / 10%), 0 0 4px 0 rgb(0 0 0 / 10%);
}
.ant-input,
.ant-input-password {
  margin-bottom: 10px;
}
</style>
