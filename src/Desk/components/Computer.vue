<template>
  <div id="computer">
    <div class="links">
      <router-link :to="{ name: 'drive' }" class="links__item">Google Drive</router-link>
      <div class="links__item links__selected">Компьютер</div>
    </div>
    <div class="loading" v-if="loading">
      <Stretch background="#0870b7" size="150px"></Stretch>
      <div class="">
        Загрузка файла<br>
        {{uploadFile.name}}
      </div>
    </div>
    <div v-else class="computer">
      <div class="computer__upload" v-if="folderId!=null" v-cloak @drop.prevent="addFile" @dragover.prevent>

        <div class="computer-dnd">
          <h2 class="computer-dnd__title">Перетащите сюда файл <br> или</h2>
          <label class="file-select">
            <div class="select-button">
              <span>загрузите с компьютера</span>
            </div>
            <input type="file" ref="myFile" id="uploadFileInput" @change="uploadFile = $refs.myFile.files[0]" />
          </label>

          <div v-if="uploadFile!=null" class="computer-dnd__fileName">
            {{uploadFile.name}}
          </div>
          <div v-else class="computer-dnd__fileName">
            Файл не выбран
          </div>
          <button :disabled="uploadFile==null" v-on:click="UploadFile()" class="computer-dnd__upload">Загрузить на Google Drive</button>
        </div>

      </div>
      <h1 class="computer__loading" v-else>Загрузка папки проекта</h1>
    </div>

  </div>
</template>

<script type="text/javascript">

export default {
  data () {
    return {
      uploadFile: null,
      loading: false
    }
  },
  props: ['folderId'],
  methods: {
    UploadFile: function() {
      uploadFile(this);
    },
    addFile(e) {
      let droppedFile = e.dataTransfer.files;
      if (e.dataTransfer.files.length!=1) {
        alert("Загрузить можно только 1 файл!");
        return;
      }
      this.uploadFile = e.dataTransfer.files[0];
      //console.log(e.dataTransfer.files);
    }
  },
  mounted: function() {
  }
}

function uploadFile(t) {
  t.loading = true;
  let file = t.uploadFile;

  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    let metadata = {
        'name': file.name, // Filename at Google Drive
        'mimeType': file.type, // mimeType at Google Drive
        'parents': [t.folderId], // Folder ID at Google Drive (remove it if want upload to root folder)
    };

    let form = new FormData();

    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    t.message = "Загрузка файла на диск..."

    let xhr = new XMLHttpRequest();
    xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,thumbnailLink');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.responseType = 'json';
    xhr.onload = () => {
      t.loading = false;
      t.$emit('FileSelected',xhr.response);
    };
    xhr.send(form);

  });

}

</script>

<style lang="scss" scoped>
.loading {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    margin-top: 15px;
    font-size: 30px;
    text-align: center;
  }
}

#computer {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.computer {
  background-color: rgb(230,230,230);
  height: calc(100% - 40px);
  width: 100%;
  position: relative;

  &__loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  &__upload {
    width: calc(100% - 50px);
    height: calc(100% - 50px);
    margin: 25px;
    outline: 5px dashed #999;
  }

  &-dnd {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;

    &__title {
      font-size: 40px;
      margin-bottom: 20px;
      font-weight: 300;
      color: #777;
    }

    &__fileName {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    &__upload {
      border: 1px solid rgb(6,50,110);
      border-radius: 3px;
      padding: 5px 10px;
      color: white;
      background-color: rgb(6,113,185);
      font-size: 18px;
      cursor: pointer;
      &:disabled {
        display: none;
      }
      &:hover {
        background-color: #005a97;
      }
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

.file-select > .select-button {
  padding: 1rem;

  color: white;
  background-color: #2EA169;

  border-radius: .3rem;

  text-align: center;
  font-weight: 400;
  font-size: 30px;
  margin-bottom: 20px;
  cursor: pointer;
}

.file-select > .select-button:hover {
  background-color: #178a52;
}


/* Don't forget to hide the original file input! */
.file-select > input[type="file"] {
  display: none;
}
</style>
