<template>
  <div id="modWin">
    <div class="files">
      <div class="files__title">
        Выбор файла
      </div>
      <i class="material-icons files__close" v-on:click="$emit('CloseModalWindow');">close</i>
    </div>
    <router-view v-bind:folderId="folderId" v-on:FileSelected="SelectFile($event)"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['folderId'],
  methods: {
    SelectFile: function(file) {
      selectFile(file,this)
    }
  }
}

function selectFile(file,t) {
  t.$emit('FileSelected',file);
}

</script>

<style lang="scss" scoped>
#modWin {
  padding: 25px;
  position: fixed;
  border: 1px solid black;
  border-radius: 10px;
  width: 60%;
  height: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: white;
  z-index: 10000;
  display: flex;
  flex-direction: column;
}

.files {
  display: flex;
  flex-direction: row;
  &__title {
    font-weight: 400px;
    font-size: 30px;
    color: #666;
  }

  &__close {
    z-index: 1488228;
    margin-left: auto;
    cursor: pointer;
  }
}

</style>
