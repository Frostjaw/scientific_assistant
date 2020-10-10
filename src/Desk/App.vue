<template>
  <div id="app">
    <div class="notify">
      Сохранено
    </div>

  <div class="modal" v-if="editingWindowVisibility">
      <div class="modal__mask" @click="CloseModal()"></div>
      <div class="modal-window">
          <h1 class="modal-window__title">Редактирование</h1>
          <div id="properties"></div>
          <div id="uploadButton" @click="uploadFileWindowVisibility = true" v-if="uploadFileButtonVisibility">Загрузить</div>
      </div>
    </div>

    <ModalWindow
      v-if="uploadFileWindowVisibility"
      v-bind:folderId="folderId"
      v-on:FileSelected="SelectFile($event)"
      v-on:CloseModalWindow="CloseModal()">
    </ModalWindow>

    <header class="header">
      <img class="header__img" src="../images/logo.png" alt="research assistant logo">
      <router-link :to="{ name: 'myprojects' }">
        <FolderOpenIcon class="header__folder-icon icon-42"/>
      </router-link>
      <h1 class="header__title">{{name}}</h1>
    </header>
    <div class='toolbar' id="toolbar">
      <div class="toolbar__nextdoor">
        <SaveIcon class="icon-30 toolbar__item" id="saveButton"/>
      </div>
      <div class="toolbar__special">
        <!--<button id="saveButton"></button>-->
        <!--<button id="undoButton"></button>-->
        <UndoIcon class="icon-30 toolbar__item" id="undoButton"/>
        <!--<button id="redoButton"></button>-->
        <RedoIcon class="icon-30 toolbar__item" id="redoButton"/>
      </div>
      <div class="toolbar__notes" id="noteToolbar"></div>
      <div class="toolbar__font" id="fontToolbar">
        <BoldIcon id="boldButton" class="toolbar__item"/>
        <ItalicIcon id="italicButton" class="toolbar__item"/>
        <UnderlineIcon id="underlineButton" class="toolbar__item"/>
        <select id="fontSizeSelect">
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
          <option value="18">18</option>
        </select>

        <select id="fontFamilySelect">
          <option value="Arial">Arial</option>
          <option value="Dialog">Dialog</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier">Courier</option>
        </select>
      </div>

      <div class="toolbar-border">
        <div class="dropdown">
          <FormatLineWeight id="changeBorderWidth" class="toolbar__item dropbtn"/>
          <div class="dropdown-content">
            <div id="changeBorderWidth4"></div>
            <div id="changeBorderWidth3"></div>
            <div id="changeBorderWidth2"></div>
            <div id="changeBorderWidth1"></div>
          </div>
        </div>
        <div class="dropdown">
          <FormatColorFill id="changeBorderColor" class="toolbar__item dropbtn"/>
          <div class="dropdown-content">
            <div id="changeBorderColor1"></div>
            <div id="changeBorderColor2"></div>
            <div id="changeBorderColor3"></div>
            <div id="changeBorderColor4"></div>
          </div>
        </div>
      </div>

    </div>
    <div class='editor'>
      <div id="graphContainer" style="overflow:hidden;cursor:default;"></div>
    </div>
    <TextIcon id='showTextButton' :size="32" />

  </div>
</template>

<script src="./desk.js"></script>

<style lang="scss">
.notify {
  border-radius: 20px;
  font-size: 24px;
  color: #323232;
  background-color: #2EA169;
  border: solid #c6c6c6 1px;
  position: fixed;
  top: -50px;
  padding: 15px;
  color: white;
  left: 50%;
  z-index: 200;
  transform: translateX(-50%);
  transition: 0.5s;
  display: none;

  &__show {
      top: 47px;
  }

}

.note {
  &__text {
    padding: 15px;
    text-align: left;
  }

  &-link {
    padding: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;

    &__img {
      margin-right: 10px;
      width: 20px;
      opacity: 1;
      cursor: pointer;
    }

    &__img:hover{
      opacity: 0.8;
    }

    &__name {
      color: #373737;
    }
  }

  &-doc {
    display: flex;
    flex-direction: row;
    padding: 15px;
    align-items: center;

    &__img {
      width: 40px;
      border: 1px solid #E3E3E3;
      margin-right: 10px;
      opacity: 1;
      cursor: pointer;
    }

    &__img:hover{
      opacity: 0.8;
    }

    &__name {
      color: #373737;
    }
  }

  &-cit {
    display: flex;
    flex-direction: column;
    padding: 15px;

    &-quote {
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: solid #c6c6c6 1px;
      padding: 5px;

      &__img {
        margin-right: 10px;
        width: 20px;
      }

      &__text {
        text-align: left;
        color: #373737;
        border-left: solid #c6c6c6 1px;
        padding-left: 8px;
      }
    }

    &-doc {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 10px;

      &__img {
        margin-right: 10px;
        width: 40px;
        border: 1px solid #E3E3E3;
        opacity: 1;
        cursor: pointer;
      }

      &__img:hover{
      opacity: 0.8;
    }

      &__text {
        text-align: left;
        color: #373737;
      }
    }
  }
}

#showTextButton {
  bottom: 15px;
  left: 15px;
  position: fixed;
  z-index: 100;
  color: #808080;
  cursor: pointer;

  &:hover{
    color: #0870b7;
  }
}

.header {
  z-index: 100;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: white;

  &__img {
    width: 50px;
    height: 55px;
    margin: 5px 0 0 15px;
    max-width: 100%;
    max-height: 100%;
  }

  &__folderIcon {
    margin-left: 32px;
    opacity: 0.3;
  }

  &__title {
    font-size: 30px;
    color: #373737;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    margin: 0px;
    margin-left: 30px;
  }

  &__folder-icon{
    margin-left: 30px;
    color: #c5c5c5;

    &:hover{
      color: #808080;
    }
  }
}

.material-design-icon.icon-42 > .material-design-icon__svg {
  height: 42px;
  width: 42px;
}

.material-design-icon.icon-30 > .material-design-icon__svg {
  height: 30px;
  width: 30px;
}


//mike
.dropbtn {
  color: white;
  //padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
  &-content {
    display: none;
    position: absolute;
    //min-width: 160px;
    border: 1px solid #CCC;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;

    & div {
      text-decoration: none;
      cursor: pointer;
    }

    & a:hover {
      background-color: #f1f1f1
    }
  }
}

.dropdown:hover .dropdown-content {
  display: block;
  background: white;
  width: 23px;
}

.dropdown:hover .dropbtn {
}
//mike

.toolbar
{
  z-index: 100;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  margin-top: 60px;
  border-top: solid rgb(198,198,198) 1px;
  border-bottom: solid rgb(198,198,198) 1px;
  display:flex;
  background: white;

  &-icon{
    height:30px;
    width:30px;
    opacity: 1;
    cursor: pointer;
    &:hover{
      opacity: 1;
    }
  }

  &__nextdoor {
    align-items: center;
    display: flex;
    margin-left: 8px;
    position: relative;
  }

  &__item {
    color: #969696;
    &:hover {
      color: #4D4D4D!important;
    }
  }

  &__special{
    padding: 0 10px 0 10px;
    border-right: solid rgb(198,198,198) 1px;
    border-left: solid rgb(198,198,198) 1px;
    display:flex;
    flex-direction: row;
    align-items: center;

  }

  &__notes{
    padding: 3px 5px 0 5px;
    border-right: solid rgb(198,198,198) 1px;

    img{
      cursor: pointer;
      margin: 0;
      &:hover{
        color: #808080;
      }
    }
  }

  &__font{
    display:flex;
    align-items: center;
    padding: 3px 10px 0 10px;
    border-right: solid rgb(198,198,198) 1px;
  }

//mike
  &-border{
      height: auto;
      padding: 2px 8px 2px 8px;
      display:flex;
      flex-direction: row;
      align-items: center;
      border-right: solid rgb(198,198,198) 1px;

      &__line {
        ul {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          transition: all 0.5s ease;
          left: 0;
          display: none;
          li {
            clear: both;
            width: 100%;
          }
        }
      }

      &__fill {
        ul {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          transition: all 0.5s ease;
          left: 0;
          display: none;
          li {
            clear: both;
            width: 100%;
          }
        }

      }
    }
//mike
}

#changeBorderWidth
{
  height: 22px;
  width: 22px;
  margin-right: 5px;
}

#changeBorderWidth1
{
  height: 23px;
  width: 23px;
  background: url('../images/line-width-1.png') no-repeat;
  background-size: 100%;
  border: 0;
  cursor: pointer;
  opacity: 0.5;
}
#changeBorderWidth1:hover {
  opacity: 0.9;
}
#changeBorderWidth2
{
  height: 23px;
  width: 23px;
  background: url('../images/line-width-2.png') no-repeat;
  background-size: 100%;
  border: 0;
  cursor: pointer;
  opacity: 0.5;
}
#changeBorderWidth2:hover {
  opacity: 0.9;
}
#changeBorderWidth3
{
  height: 23px;
  width: 23px;
  background: url('../images/line-width-3.png') no-repeat;
  background-size: 100%;
  border: 0;
  cursor: pointer;
  opacity: 0.5;
}
#changeBorderWidth3:hover {
  opacity: 0.9;
}
#changeBorderWidth4
{
  height: 23px;
  width: 23px;
  background: url('../images/clear-button.png') no-repeat;
  background-size: 100%;
  border: 0;
  cursor: pointer;
  opacity: 0.5;
}
#changeBorderWidth4:hover {
  opacity: 0.9;
}





#changeBorderColor
{
  height: 30px;
  width: 30px;
  position: relative;
  top: 3px;
}
#changeBorderColor1
{
  height: 23px;
  width: 23px;
  background: url('../images/line-color-1.png') no-repeat;
  background-size: 100%;
  border: 0;
  cursor: pointer;
  opacity: 0.5;
}
#changeBorderColor1:hover {
  opacity: 0.9;
}
#changeBorderColor2
{
  height: 23px;
  width: 23px;
  background: url('../images/line-color-2.png') no-repeat;
  background-size: 100%;
  border: 0;
  cursor: pointer;
  opacity: 0.5;
}
#changeBorderColor2:hover {
  opacity: 0.9;
}
#changeBorderColor3
{
  height: 23px;
  width: 23px;
  background: url('../images/line-color-3.png') no-repeat;
  background-size: 100%;
  border: 0;
  cursor: pointer;
  opacity: 0.5;
}
#changeBorderColor3:hover {
  opacity: 0.9;
}
#changeBorderColor4
{
  height: 23px;
  width: 23px;
  background: url('../images/line-width-1.png') no-repeat;
  background-size: 100%;
  border: 0;
  cursor: pointer;
  opacity: 0.5;
}
#changeBorderColor4:hover {
  opacity: 0.9;
}

#clearBorderButton
{
  height: 23px;
  width: 23px;
  background: url('../images/clear-button.png') no-repeat;
  background-size: 100%;
  margin-left: 3px;
  border: 0;
}

#boldButton{
  cursor: pointer;
  &:hover{
    color: #808080;
  }
}

#italicButton{
  cursor: pointer;
  &:hover{
    color: #808080;
  }
}

#underlineButton{
  cursor: pointer;
  &:hover{
    color: #808080;
  }
}

.editor{
}

#saveButton{
  //border: 0;
  margin-right: 10px;
  cursor: pointer;
  &:hover{
    color: #808080;
  }
}

#undoButton{
  // height: 30px;
  // width: 30px;
  // background: url('../images/outline_undo_black_24dp.png') no-repeat;
  // background-size: 100%;
  //border: 0;
  cursor: pointer;
  &:hover{
    color: #808080;
  }
}

#redoButton{
  // height: 30px;
  // width: 30px;
  // background: url('../images/outline_redo_black_24dp.png') no-repeat;
  // background-size: 100%;
  //border: 0;
  cursor: pointer;
  &:hover{
    color: #808080;
  }
}

#graphContainer{
  background: url('../images/white-tree-background.png');
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;

  &__mask {
    z-index: 9998;
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
  }

  &-window {
    padding: 30px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 9999;
    border: 1px solid grey;
    box-shadow: 0px 0px 26px 6px rgba(0,0,0,0.2);
    border-radius: 5px;
    background-color: white;
    width: 35%;

    &-form {
      display: flex;
      flex-direction: column;
      font-size: 24px;

      &__name {
        opacity: 0.6;
      }

      &__input {
        outline: none;
        border: none;
        font-size: 18px;
        margin: 5px 0 15px 0;
        font-size: 24px;
        border-bottom: 1px solid #333;
        margin-bottom: 30px;
      }

      &__textarea {
        border: 1px solid grey;
        border-radius: 5px;
        height: 300px;
        font-family: 'Roboto', sans-serif;
        font-size: 24px;
        margin-bottom: 30px;
        margin-top: 10px;
      }
    }
  }

}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

#uploadButton {
  width: 100px;
  text-align: center;

  border: 1px solid rgb(6,50,110);
  border-radius: 3px;
  padding: 5px 10px;
  color: white;
  background-color: rgb(6,113,185);
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #005892;
  }
}

#fontSizeSelect{
  margin: 0 5px 5px 5px;
}

#fontFamilySelect{
  margin: 0 5px 5px 5px;
}

</style>
