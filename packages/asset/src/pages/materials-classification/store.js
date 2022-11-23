import { ref, nextTick } from "vue";
import {
  query,
  create,
  edit,
  del,
  itemClassifyList,
  creatItemClassify,
  editItemClassify,
  delItemClassify,
} from "./api/index.js";
export const dataModel = ref({});
export const editClassDataModel = ref({});
export const formRef = ref(null); // 表单实例
export const pageRef = ref(null);
export const tableRef = ref(null);
export const visible = ref(false);
export const action = ref("create");
export const orgTree = ref([]);
export const searchOrgName = ref("");
export const treeSelectId = ref("");
export const classificationModal = ref(false);
export const saveParentId = ref("");
export const treeSpinShow = ref(false);
export const selectedOrgType = ref(0);
export const editClassRef = ref(null);
export const orgSearch = () => {
  itemClassifyListFn();
};
export const itemClassifyListFn = () => {
  treeSpinShow.value = true;
  itemClassifyList({ isDefault: 0, isDel: 0 })
    .then((res) => {
      let fun = (list) => {
        list.forEach((e) => {
          e.kids.length == 0 ? (e.kids = null) : fun(e.kids);
        });
      };
      fun(res);
      orgTree.value = res;
    })
    .finally(() => {
      treeSpinShow.value = false;
    });
};
export const menuSelected = ([key], [options]) => {
  treeSelectId.value = key;
  let classifyCode = options.classifyCode;
  console.log(options,'optionsoptions')
  if (!options.kids) {
    selectedOrgType.value = 2;
    dataModel.value.classifyName = options.classifyName;
    dataModel.value.classifyCode = options.classifyCode;
    dataModel.value.classifyId = options.id;
  } else {
    selectedOrgType.value = 0;
  }

  tableRef.value.searchFormCache.value = {
    classifyCode: classifyCode.value == "0" ? null : classifyCode,
  };
  console.log(tableRef.value.searchFormCache.value)
  tableRef.value.commitQuery();
};
export const vbind = {
  request: {
    XHR: query, // promise 请求函数
    params: { isDefault: 1 },
    pageMethod: (current, size) => ({
      page: {
        current,
        size,
      },
    }),
  },
  response: {
    dataMethod: (res) => res.records,
    pageMethod: ({ total }) => total,
  },
};

export const handleShow = (row) => {
  action.value = row ? "edit" : "create";
  visible.value = true;
  if (row) {
    nextTick().then(() => {
      formRef.value.setValue(row);
    });
  } else {
    nextTick().then(() => {
      if (!dataModel.value.itemCode) dataModel.value.itemCode = "init";
      formRef.value.setValue(dataModel.value);
    });
  }
};
export const creatClassification = (row) => {
  action.value = row ? "edit" : "create";
  classificationModal.value = true;
  if (row) {
    nextTick().then(() => {
      editClassRef.value.setValue(row);
    });
  } else {
    nextTick().then(() => {
      if (!editClassDataModel.value.classifyCode)
        editClassDataModel.value.classifyCode = "init";
      editClassRef.value.setValue(editClassDataModel.value);
    });
  }
};
export const handleSaveeditClass = async () => {
  let data = {};
  data = await editClassRef.value.getValue();
  console.log(data, "editClassRef");
  if (action.value === "create") {
    creatItemClassify(data).then((res) => {
      itemClassifyListFn();
      classificationModal.value = false;
    });
  } else {
    editItemClassify(data).then((res) => {
      itemClassifyListFn();
      classificationModal.value = false;
    });
  }
};
export const pOptions = ref([]);

export const handleSave = async () => {
  let data = {};
  data = await formRef.value.getValue();
  if (action.value === "create") {
    create(data).then((res) => {
      visible.value = false;
      tableRef.value.commitQuery();
    });
  } else {
    edit(data).then((res) => {
      visible.value = false;
      tableRef.value.commitQuery();
    });
  }
  // (action.value === 'create' ? create : edit)(data).then(res => {
  //     visible.value = false
  //     tableRef.value.commitQuery();
  // })
};

export const handleCancel = () => {
  visible.value = false;
};
export const handleDel = () => {};
export const handleDelItemClassify = (id) => {
  delItemClassify(id).then(() => {
    itemClassifyListFn();
  });
};
