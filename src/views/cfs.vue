<template>
     <div class="box">
      <div class="content-body">
        <div class="portlet-body">
          <form action="">
			  <el-button @click="addTab(editableTabsValue)">添加处方</el-button> 
			<el-tabs v-model="editableTabsValue" type="card" closable ref='tabs1'
				@tab-remove="removeTab"
				:before-leave="beforeLeaveTab">
				<el-tab-pane
				v-for="(item, index) in editableTabs"
				:key="item.id"
				:label="'处方'+ item.title"
				:name="item.id">
			<cf is='currentView' keep-alive></cf>
			</el-tab-pane>
			</el-tabs>
          </form>
        </div>
      </div>
    </div> 
    
</template>

<script>
import cf from '@/components/cf.vue'
export default {
	components: {
		currentView:cf
	},
  data () {
    return {
			editableTabsValue: '1',
			currentView:'cf',
			title:["一","二","三","四","五","六","七","八","九","十"],
			editableTabs: [
				{
					id: '1',
					title:"一",
					view: cf
				}
			],
			tabIndex: 1,
			isTip : true
    	}
	 },
	 methods: {
		 //新增处方
		addTab (targetId) {
			let _tabs = this.editableTabs;
			if (_tabs.length >= 10) {
			this.$message({
				message: '处方模板不能超过十条',
				type: 'warning',
			});
			return;
			}
			let newTabId = ++this.tabIndex + '';
			let _title = this.title[_tabs.length];
			this.editableTabs.push({
				id: newTabId,
				title: _title,
				view: cf
			});
			this.isTip = false;
			this.editableTabsValue = newTabId;
		},
		//删除处方
		removeTab(targetId,targetTitle) {
			let tabs = this.editableTabs;
			let activeId = this.editableTabsValue;
			//处方为一个时，不可删除,重新初始化
			if(tabs.length == 1){
				this.addTab(targetId);
			};
			if (activeId === targetId) { 
				tabs.forEach((tab, index) => {	
					if (tab.id === targetId) {
						let nextTab = tabs[index + 1] || tabs[index - 1];
						if (nextTab) {
							activeId = nextTab.id;
						}
						this.isTip = false;
						this.editableTabsValue = activeId;
					}
				});
			}
			this.editableTabs = tabs.filter(tab => tab.id !== targetId);
			let editTabs = this.editableTabs;
			editTabs.forEach((value,index) => {
				value.title = this.title[index];
			})
		},
		beforeLeaveTab(){
			if(!this.isTip){
				this.isTip = true;
				return true;
			}
		},
	}
}
</script>

<style lang="scss" scope>
*{
    padding: 0;
    margin: 0;
    outline: none;
    list-style: none;
}
.box{
	width: 1471px;
	margin: 0 auto;
	.nav li{
		float: left;
		text-align: center;
		cursor: pointer;
		border: 1px solid #ebeef5;
		a{
			cursor: pointer;
			padding: 10px 15px;
			display: inline-block;
		}
	}
	.tab-content {
		.el-table{
			.el-table__header{
				.has-gutter{
					color: #333333;
					th{
						padding: 3px 0;
					}
				}
			}
			.el-table__body{
				td{
					padding: 2px 0;
					.cell{
						button{
							padding: 0;
						}
						i{
							padding: 2px;
						}
						.ivu-select-selection {
							height: 26px;
							.ivu-select-input {
								height: 25px;
								line-height: 25px;
							}
							i{
								margin-top:-11px;
							}
						}
						#consumption,#day,#num{
							text-align: center;
						}
					}
				}
			}
		}
	}
}
</style>
