<template>
  <div>
    <b-loading v-if="isLoading" :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>  <!-- v-if="$fetchState.pending"  -->
    <div class="columns">
      <div class="column is-mobile">
        <div class="column is-half is-offset-one-quarter">
          <div id="app" class="container">
            <section>
                <div class="card" animation="slide" aria-id="contentIdForA11y3">
                    <div class="card-content">
                        <div class="content">
                          <form>
                            <b-field label="Email"
                                :type="emailError == '' ? '' : emailError ? 'is-danger' : 'is-success'"
                                :message="emailError == '' ? '' : emailError ? emailErrorMss : '' ">
                                <b-input type="email"
                                    value=""
                                    maxlength="30"
                                    icon="email"
                                    v-model="auth.email">
                                </b-input>
                            </b-field>
                            <b-field label="Password"
                                :type="passError == '' ? '' : passError ? 'is-danger' : 'is-success'"
                                :message="passError == '' ? '' : passError ? passErrorMss : '' ">
                                <b-input type="password"
                                    value=""
                                    password-reveal
                                    icon="key"
                                    v-model="auth.password">
                                </b-input>
                            </b-field>
                            <b-message v-if="temDisabled" type="is-danger" has-icon v-text="temDisabledMss"></b-message>
                            <b-button @click="login" type="is-success">Log In</b-button>
                            <b-button @click="forgotPassword" type="is-success">Forgot Password</b-button>

                          </form>
                        </div>
                    </div>
                </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailError: '',
      emailErrorMss: '',
      passError: '',
      passErrorMss: '',
      temDisabled: '',
      temDisabledMss: '',
      auth: {
        email: '',
        password: ''
      },
      isLoading: false,
      isFullPage: true
    }
  },
  methods: {
    login(){
      this.isLoading = true
      let that = this;
      this.$fire.auth.signInWithEmailAndPassword(this.auth.email, this.auth.password)
      .catch(function(error){
        that.isLoading = false

        let message = error.message;

        if(message.includes("There is no user record corresponding to this identifier") || message.includes("auth/invalid-email")){
        that.emailError = true;
          if(message.includes("There is no user record corresponding to this identifier")){ 
            that.emailErrorMss = "There isn't a user with this email";
          }
          else if(message.includes("The email address is badly formatted"))
            that.emailErrorMss = "The email format is invalid";
        }
          else
          if(message.includes("wrong-password")){
            that.passError = true;
              if(message.includes("The password is invalid"))
                that.passErrorMss = "The password is invalid";
          }
          else
            if(message.includes("auth/too-many-requests")){
              that.temDisabled = true;
              that.temDisabledMss = "This account has been temporaly disabled due too many failed login attempts";
            }
        }).then((user) => {
          if(!that.emailError && !that.passError && !that.temDisabled){
            that.$router.push('/')
            setTimeout(() => {
              this.isLoading = false
            }, 500)
          }
        })

        setTimeout(() => {
          that.emailError = '',
            that.emailErrorMss = '',
            that.passError = '',
            that.passErrorMss = '',
            that.temDisabled = '',
            that.temDisabledMss = ''
        }, 3500);
    },
    forgotPassword(){
      let that = this;
      this.$fire.auth.sendPasswordResetEmail(this.auth.email)
      .then(function () {
        that.temDisabled = true;
        that.temDisabledMss = "The reset link was sent to " + that.auth.email;

        setTimeout(() => {
          that.temDisabled = '',
          that.temDisabledMss = ''
      }, 3500);
      })
    },
    
  }
}
</script>

