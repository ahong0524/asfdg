<template>
  <!-- <div class="max_box"> -->
  <!-- <div v-for="to in item" :key="to.value" class="item_box"></div> -->
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    editable
    @edit="handleTabsEdit"
  >
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      {{ item.content }}
    </el-tab-pane>
  </el-tabs>
  <!-- </div> -->
</template>
<script>
// import vt from '@/vuex/store.js'
// console.log(vt.store)
export default {
  data() {
    return {
      editableTabsValue: '2',
      editableTabs: [
        {
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        },
        {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }
      ],
      tabIndex: 2
    }
  },
  methods: {
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        const newTabName = `${++this.tabIndex}`
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        })
        this.editableTabsValue = newTabName
      }
      if (action === 'remove') {
        const tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }

        this.editableTabsValue = activeName
        this.editableTabs = tabs.filter((tab) => tab.name !== targetName)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// .max_box {
//   height: 40px;
//   width: 100%;
//   margin: 0;
//   padding: 0;
//   border-bottom: 1px solid #ccc;
// }
// .item_box {
//   width: 50px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   height: 30px;
// }
</style>
