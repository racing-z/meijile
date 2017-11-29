<template>
    <div>
        <Table border :columns="columns" :data="logList.content"></Table>
        <mu-pagination class="stationPage" :total="logList.totalElements" :current="logList.number + 1" @pageChange="pageChange"></mu-pagination>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import './log.sass'
export default {
    data () {
        return {
            columns: [
                {
                    title: '创建时间',
                    key: 'createDate'
                },
                {
                    title: 'IP',
                    key: 'ip'
                },
                {
                    title: '请求方式',
                    key: 'method'
                },
                {
                    title: '请求参数',
                    key: 'params'
                },
                {
                    title: '耗时',
                    key: 'spendTime'
                },
                {
                    title: '用户名字',
                    key: 'userName'
                }
            ]
        }
    },
    computed: mapGetters({
        logList: 'logList'
    }),
    created () {
        this.$store.dispatch('getLogList', {
            page: 0,
            size: 10
        })
    },
    methods: {
        pageChange: function (pageNumber) {
            this.$store.dispatch('getLogList', {
                page: pageNumber - 1,
                size: 10
            })
        }
    }
}
</script>
