<template>
  <router-link id="project" class="project" :to="{ name: 'desk', query: { id: project.id, name: project.name, docId: project.docId, folderId: project.folderId} }" @click.native="ConfirmRedirect($event)">
    <i class="material-icons project__img">folder</i>
    <div class="project__name" v-if="!project.editing" >
      {{project.name}}
    </div>
    <input type="text" v-if="project.editing" id="projectName" class="project__nameEdit" :value="project.name">
    <i class="material-icons project__apply" v-if="project.editing" v-on:click="ApplyFileName();">done</i>
    <i class="material-icons project__cancel" v-if="project.editing" v-on:click="CancelEdit();">clear</i>
    <i class="material-icons project__edit" v-if="!project.editing" v-on:click="EditFileName();">create</i>
    <i class="material-icons project__delete" v-if="!project.editing" v-on:click="SelectFile();">delete</i>
  </router-link>

</template>

<script src="../components/project.js"></script>

<style lang="scss" scoped>
.project {
  text-decoration: none;
  color: #8B8B8B;
  opacity: 0.6;
  padding: 10px;
  flex: 0 0 28%;
  margin: 15px;
  max-width: 438px;
  border: 1px solid grey;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  &__img {
    font-size: 25px;
    color: #333;
  }

  &__name {
    color: #333;
    margin-left: 15px;
    font-size: 18px;
    overflow: hidden;
  }

  &__nameEdit {
    border: none;
    border-bottom: 1px solid #333;
    outline: none;
    font-size: 18px;
    width: 100%;
    margin: 0 5px;
  }

  &__cancel {
      cursor: pointer;
      &:hover {
        color: red;
        font-size: 25px;
      }
  }

  &__apply {
    cursor: pointer;
    &:hover {
      color: green;
      font-size: 25px;
    }
  }

  &__edit {
    align-self: flex-start;
    margin-left: auto;
    display: none;
    font-size: 18px;
    margin-right: 5px;
    cursor: pointer;
    color: #8B8B8B;
    transition: 0.3s ease-in-out;
    &:hover {
      color: #636363;
      font-size: 19px;
    }
  }

  &__delete {
    align-self: flex-start;
    display: none;
    font-size: 18px;
    margin-right: 5px;
    cursor: pointer;
    color: #8B8B8B;
    transition: 0.3s ease-in-out;
    &:hover {
      color: #636363;
      font-size: 19px;
      //text-shadow: #333 2px 2px 2px;
    }
  }

  &:hover {
      opacity: 2;

    .project__delete {
      display: block;
    }

    .project__edit {
      display: block;
    }
  }
}

</style>
