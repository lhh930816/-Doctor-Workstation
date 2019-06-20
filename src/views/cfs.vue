<template>
     <div class="box">
      <div class="content-body">
        <div class="portlet-body">
          <form action="">
			  <el-button @click="addTab(editableTabsValue)">添加处方</el-button>
				<el-button @click="group">成组</el-button> 
				<el-button @click="cancel">取消成组</el-button> 
			<el-tabs v-model="editableTabsValue" type="card" closable ref='tabs1'
				@tab-remove="removeTab"
				:before-leave="beforeLeaveTab">
				<el-tab-pane
				v-for="item in editableTabs"
				:key="item.id"
				:label="'处方'+ item.title"
				:name="item.id">
			<cf is='currentView' keep-alive @group='getData'></cf>
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
			tableData: [],
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
		getData (msg){ //接收子组件传递的值
			this.data = msg.multipleSelection;
			this.tableData = msg.tableData;
		},
		//成组
		group () {
			let _this = this;
			let _data = _this.tableData;
			let $tr = $(".el-table__row");
			let _length = $tr.find("input[type='checkbox']:checked").length;
			let _max_czbz = _this.max_czbz(_data);
			if (_length == 0) {
				_this.$message({
					message: '请选择要成组的数据',
					type: 'warning',
				});
				return false;
			} else if(_length == 1){
				_this.$message({
					message: '一条药品不能成组',
					type: 'warning',
				});
				return false;
			}
			let stor = _this.SelectSort($tr, _data);
			if (stor.length > 1) {
				if (window.confirm("您选择的药品已经成组，请问是否需要清空重绑")) {
					$tr.each(function (index) {
						let checkbox = $(this).find("input[type='checkbox']").prop("checked");
						if (checkbox) {
							_this.clearSort ($tr, _data, _data[index].czbz);
							_this.$nextTick (() =>{
								_data[index].czbz = _max_czbz + 1;
							})
						}
					});
				} else {
						return;
				}
			} 
			else {
				if (stor.length > 0) {
					_max_czbz = stor[0];
				} else {
					_max_czbz = _max_czbz + 1;
				}
				$tr.each(function (index) {
					let _checkbox = $(this).find("input[type='checkbox']").prop("checked");
					if (_checkbox) {
						_data[index].czbz = _max_czbz;
					}
				})
			}
		
			_this.$nextTick (() => {
				_data.sort(_this.compare("czbz"));
				_this.addText($tr, _data);
			})
		},
		//数组排序
		compare (property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    },
		//获取当前组号最大值
		max_czbz (data) {
			let _czbz = 0;
			$.each(data, function (i,o) {
				if (_czbz < o.czbz) {
					_czbz = o.czbz;
				}
			})
			return _czbz;
		},
		//获取当前选中的行组号
		SelectSort (tr, data) {
			let n = new Array();
			tr.each(function (index,row) {
				let checked = $(this).find("input[type='checkbox']").prop("checked");
				if (checked) {
					if (data[index].czbz > 0) {
						if ($.inArray(data[index].BYZD, n) == -1) {
							n.push(data[index].czbz);
						}
					}
				}
			});
			return n;
		},
		//清除组号
		clearSort (tr, data, czbz) {
			tr.each(function (index, row) {  
				if (data[index].czbz > 0) {
					if (data[index].czbz = czbz) {
						data[index].czbz = 0;
					}
				}
			})
		},
		//
		addText (tr,data) {
			tr.each( function (index, row) {
				let html = '';
				let czbz = data[index].czbz;
				if (czbz > 0) {
					if (index == 0) {
						html = '┌';
					} 
					else {
						let prv_czbz = data[index-1].czbz;
						var next_czbz = "";
						if (index < data.length - 1) {
							next_czbz = data[index + 1].czbz;
						}
						if (czbz != prv_czbz && czbz == next_czbz) {
							html = '┌';
						} else if (czbz ==prv_czbz && czbz ==next_czbz) {
							html = '|';
						} else {
							html ='└'
						}
					}
				}
				$(this).find("td .cell:eq(2)").text(html);
			})
		},
		cancel () {
			console.log(2);
		}
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
			.el-table__header-wrapper .el-checkbox {
						display: none;
			}	
		}
	}
}
</style>
