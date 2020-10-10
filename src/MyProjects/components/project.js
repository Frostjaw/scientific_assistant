import Vue from 'vue';

export default {
  data() {
    return {
    }
  },
  props: {
    project: {
      type: Object
    },
    visible: Boolean
  },
  methods: {
    SelectFile: function () {
      selectFile(this);
    },
    OpenProject: function() {
      openProject(this.project);
    },
    EditFileName: function() {
      editFileName(this);
    },
    CancelEdit: function() {
      closeEdit(this);
    },
    ApplyFileName: function() {
      applyChanges(this);
    },
    ConfirmRedirect: function(e) {
      e.preventDefault();
    },

  },
  mounted: function() {
  },
  updated: function() {
  }
}

function selectFile(t) {
  t.$emit('popupWindowVisibility', true);
  t.$emit('selectedProject', t.project);
  t.$emit('deleteMark', true);
}

function editFileName(t) {
  t.$emit('editing', t.project);
  t.$emit('selectedProject', t.project);
}

function closeEdit(t) {
  t.$emit('editingCancel',t.project);
}

function applyChanges(t) {
  t.$emit('rename', document.getElementById('projectName').value)
  t.$emit('editingCancel',t.project);
}


function openProject(project) {

}
