<template>
  <div id="drive">
    <div class="links">
      <div class="links__item links__selected">Google Drive</div>
      <router-link :to="{ name: 'computer' }" class="links__item">Компьютер</router-link>

    </div>
    <div class="drivelist" v-if="folderId!=null">
      <div class="drivelist-item"
      v-for="driveFile in driveFiles"
      v-on:click="SelectDriveFile(driveFile)"
      >
        <div class="drivelist-item__img" v-bind:style="{ 'background-image': 'url(' + driveFile.thumbnailLink + ')' }"></div>
        <div class="drivelist-item__name">
          {{driveFile.name}}
        </div>

      </div>
    </div>
    <h1 class="drive__error" v-else>
      {{message}}
    </h1>
  </div>
</template>

<script type="text/javascript">

export default {
  data () {
    return {
      message: "Загрузка файлов...",
      driveFiles: null
    }
  },
  props: ['folderId'],
  methods: {
    SelectDriveFile: function(file) {
      selectDriveFile(file,this)
    }
  },
  mounted: function() {
    getDriveFiles(this);
  }
}

function selectDriveFile(file,t) {
  t.$emit('FileSelected',file);
}

function getDriveFiles(t) {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', "https://www.googleapis.com/drive/v3/files?q='" + t.folderId + "'+in+parents&fields=files(id,name,thumbnailLink)");
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.responseType = 'json';
    xhr.onload = () => {
      t.driveFiles = xhr.response.files;
    };
    xhr.send();

  });
}

</script>

<style lang="scss" scoped>

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

#drive {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.drivelist {
  height: 100%;
  overflow-y: scroll;
  background-color: rgb(230,230,230);
  padding: 15px;
  display: flex;
  flex-wrap: wrap;

  &-item {
    padding: 10px;
    width: 10%;
    height: 20%;
    flex: 0 1 14%;
    margin-bottom: 20px;
    align-items: center;
    cursor: pointer;

    &__name {
      font-size: 14px;
      padding: 0 5px;
      text-align: center;
    }

    &__img {
      width: 100%;
      height: 100px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      border: 1px solid black;
    }

    &:hover {
      border-radius: 5px;
      background-color: rgb(200,200,200);
    }
  }
}

.links {
  display: flex;
  flex-direction: row;

  &__item {
      text-decoration: none;
      color: black;
      font-size: 18px;
      margin: 10px;
  }

  &__selected {
    font-weight: bold;
    border-bottom: 2px solid rgb(117,149,200);
  }

}
</style>
