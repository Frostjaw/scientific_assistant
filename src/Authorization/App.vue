<template>
  <div id="Authorization">
    <header class="header">
        <img class="header__img" src="../images/logo.png" alt="research assistant logo">
        <h1 class="header__title">Научный ассистент</h1>
    </header>
    <div class="signIn">
        <img class="signIn__userImage" src="../images/user_login.png" />
        <div class="signIn__title">Вход в систему</div>
        <router-link to="/myprojects"><div class="signIn__button"></div></router-link>

    </div>

  </div>

</template>

<script>
  export default {
    data () {
      return {}
    },
    beforeRouteLeave  (to, from, next) {
      chrome.identity.getAuthToken({ interactive: true }, function (token) {
        var x = new XMLHttpRequest();
        x.open('GET', 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json');
        x.setRequestHeader('Authorization', 'Bearer ' + token);
        x.responseType = 'json';
        x.onload = function() {
          next();
        };
        x.send();

      });

    }

  }
</script>

<style lang="scss" scoped>
  body{
    margin: 0!important;
  }

  .header{
    border-bottom: solid #0c73b8 2px;
    margin: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    &__img {
      width: 130px;
      height: 155px;
      margin-left: 15px;
      max-width: 100%;
      max-height: 100%;
    }

    &__title {
      font-size: 35px;
      color: #373737;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      margin-left: 30px;
      line-height: 60px;
      text-transform: uppercase;
    }

  }


  .signIn {
    margin: 120px auto 0 auto;
    width: 450px;
    height: 300px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(56,56,56,0.38);
    border: 1px solid #373737;
    text-align: center;

    &__userImage {
      width: 100px;
      height: 100px;
      margin-top:-50px;
      max-width: 100%;
      max-height: 100%;
    }

    &__title {
      text-align: center;
      font-size: 25px;
      line-height: 117px;
      color: #373737;
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
    }

    &__button {
      margin:0 auto;
      width:250px;
      height:54px;
      padding: 0px;
      background: url('../images/login-google-blue.png') no-repeat;
      background-size:100%;
      border:0;

      &:hover{
        box-shadow: 0px 0px 6px 5px rgba(0,0,0,0.2);
      }
    }

  }
</style>
