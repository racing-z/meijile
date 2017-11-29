<template>
    <div class="dialog">
        <div class="btn-group">
            <!-- 创建弹窗 -->
            <mu-dialog :open="isOpen.isAdd" :title="'添加'+state.name" @close="isOpen.isAdd = false">
                <mu-text-field v-for="item in inputArr" :key="item.value" :label="item.name" v-model="state[item.value]" @input="inputChange" labelFloat fullWidth/>
                <div>
                    <mu-radio v-for="item in radiosArr" :key="item.value" :label="item.name" name="type" :nativeValue="item.value" v-model="state.type" @input="inputChange" class="demo-radio" uncheckIcon="favorite_border" checkedIcon="favorite"/>
                </div>

                <mu-flat-button slot="actions" @click="isOpen.isAdd = false" primary label="取消" />
                <mu-flat-button slot="actions" @click="fun.addClick" primary label="确定" />
            </mu-dialog>
            <!-- 编辑 -->
            <mu-dialog :open="isOpen.isEdit" :title="'编辑'+state.name" @close="isOpen.isEdit = false">
                <mu-text-field v-for="item in inputArr" :key="item.value" :label="item.name" v-model="state[item.value]" @input="inputChange" labelFloat fullWidth/>
                <div>
                    <mu-radio v-for="item in radiosArr" :key="item.value" :label="item.name" name="type" :nativeValue="item.value" v-model="state.type" @input="inputChange" class="demo-radio" uncheckIcon="favorite_border" checkedIcon="favorite"/>
                </div>
                <mu-flat-button slot="actions" @click="isOpen.isEdit = false" primary label="取消" />
                <mu-flat-button slot="actions" @click="fun.editClick" primary label="确定" />
            </mu-dialog>
            <!-- 确认删除弹窗 -->
            <mu-dialog :open="isOpen.isRemove" :title="'删除'+state.name" @close="isOpen.isRemove = false">
                一旦删除{{state.name}}将不能找回，是否删除 <b>{{state.zhName}}</b> {{state.name}}？
                <mu-flat-button slot="actions" @click="isOpen.isRemove = false" primary label="取消" />
                <mu-flat-button slot="actions" primary @click="fun.removeClick" label="确定" />
            </mu-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            isOpen: this.open,
            state: this.data,
            radiosArr: (typeof (this.data.radiosArr) === 'string') ? JSON.parse(this.data.radiosArr) : this.data.radiosArr,
            inputArr: (typeof (this.data.inputArr) === 'string') ? JSON.parse(this.data.inputArr) : this.data.inputArr,
            fun: this.cb
        }
    },
    props: ['open', 'data', 'cb'],
    methods: {
        inputChange () {
            this.$emit('onInputChange', this.state)
        }
    }
}
</script>

