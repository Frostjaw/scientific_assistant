<template>

  <div id="app">
    <header class="header">
      <img class="header__img" src="../images/logo.png" alt="research assistant logo">
      <h1 class="header__title">Научный ассистент</h1>
      <div class="header-profile" >
        <div class="header-profile__name">{{profile}}</div>
        <i class="material-icons header-profile__icon"
        @click="LogOut()">exit_to_app</i>
      </div>
    </header>

    <div class="projects" >
      <div class="projects__head">
        <h3 class="projects__title">Мои проекты</h3>
        <i class="material-icons projects__additem"
        @click="SetModalWindowMark()"
        >add_circle</i>
      </div>
      <div class="projects-block">
        <div class="loading" v-if="loading">
          <Stretch background="#0870b7"></Stretch>
        </div>
        <Project v-else
        v-for="project in projects"
        v-bind:key="project.id"
        v-bind:project="project"
        v-on:popupWindowVisibility="visible = $event"
        v-on:selectedProject="selectedProject = $event"
        v-on:deleteMark="deleteMark = $event;"
        v-on:rename="renameFile($event)"
        v-on:editing="editing($event,true)"
        v-on:editingCancel="editing($event,false)"
        v-on:rerender="Rerender()"
        ></Project>
      </div>
    </div>


    <div class="modal" v-if="visible">
      <div class="modal__mask" @click="CloseModal()"></div>
      <div class="modal-window" v-if="deleteMark">
          <div class="modal-window__title">Удалить проект</div>
          <div class="modal-window__titleName">{{selectedProject.name}} ?</div>
          <div class="modal-window__buttons">
            <button type="button" @click="DeleteFile()" id="delete__button"><i class="material-icons">delete</i></button>
            <button type="button" @click="CloseModal()">отмена</button>
          </div>
      </div>
      <div class="modal-window" v-else>
        <form action="" autocomplete="off">
          <h1 class="modal-window__title">Создать проект</h1>
          <div class="modal-window__inputTitle">Имя проекта*</div>
          <input type="text" class="modal-window__input" id="fileName" v-model="fileName" maxlength="80">
          <div class="modal-window__buttons">
            <button class="createbutton" type="button" @click="CreateFile()" :disabled="fileName.length == 0">Создать</button>
            <button type="button" @click="CloseModal()">Отмена</button>
          </div>
        </form>
      </div>
    </div>

  </div>

</template>

<script src="./myProjects.js"></script>

<style lang="scss" scoped>
.loading {
  height: 100%;
  align-items: center;
  text-align: center;
  z-index: 10;
  padding: 30px;
  margin: 0 auto;
}

p {
  font-size: 20px;
}

body {
  margin: 0;
}

.header {
  border-bottom: solid #0c73b8 2px;
  margin: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: auto;
  z-index: auto;

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

  &-profile {
    align-self: flex-end;
    margin-left: auto;
    margin-bottom: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;

    &__name {
      font-size: 24px;
      color: #333;
    }

    &__icon {
      transform: scaleY(1.5);
      font-size: 26px;
      color: #555;
      margin-left: 20px;
      cursor: pointer;
      &:hover {
        color: #0c73b8;
      }
    }
  }


}

.projects {

  margin: 10% 10%;

  &__head {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
  }

  &__title {
    font-size: 32px;
    color: #333;
    font-family: 'Roboto', sans-serif;
    display: inline;
    margin: 0;
  }

  &__additem {
    margin-left: 15px;
    padding-top: 4px;
    color: #0c73b8;
    text-align: center;
    opacity: 0.8;
    cursor: pointer;
    transition: 0.1s ease-in-out;
    &:hover {
      opacity: 1;
    }
  }

  &-block {
    border-radius: 5px;
    border: 1px solid #777;
    box-shadow: 0px 0px 7px 2px rgba(0,0,0,0.20);
    padding: 25px;
    display: flex;
    flex-wrap: wrap;
  }
}


.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;


  &__mask {
    z-index: 9998;
    position: relative;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
  }

  &-window {
    padding: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 9999;
    border: 1px solid grey;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0px 0px 26px 6px rgba(0,0,0,0.2);

    &__title {
      text-align: center;
      font-weight: 400;
      font-size: 25px;
    }

    &__titleName {
      text-align: center;
      font-weight: 600;
      font-size: 21px;
      min-width: 300px;
      margin-bottom: 30px;
    }

    &__inputTitle {
      font-size: 14px;
      color: black;
      opacity: 0.6;
    }

    &__input {
      outline: none;
      border: none;
      font-size: 18px;
      width: 300px;
      margin: 5px 0 15px 0;
      border-bottom: 1px solid #333;
    }

    &__buttons {

      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 15px;

      & .createbutton {
        border: 1px solid rgb(6,50,110);
        border-radius: 3px;
        padding: 5px 10px;
        color: white;
        background-color: rgb(6,113,185);
        font-size: 18px;
        cursor: pointer;
        &:disabled {
          opacity: 0.6;
        }
      }

      & button {
        border: 1px solid #333;
        border-radius: 3px;
        padding: 5px 10px;
        color: rgb(200,0,0);
        min-width: 80px;
        background-color: white;
        font-size: 18px;
        cursor: pointer;
        transition: 0.1s ease-in-out;

        &:first-child:hover {
          background-color: #005892;
        }

        &:last-child {
          background-color: white;
          color: #777;
          &:hover {
            background-color: #EBEBEB;
          }
        }
      }

    }
    #delete__button:hover {
      background-color: #c80000;
      color: white;
      transition: 0.1s;
    }
  }
}


</style>
