<template>
    <div class="ui grid">
        <div class="row">
            <div class="right aligned column">
                <RouterLink class="ui labeled icon mini button" to="/create">
                    <i class="plus icon"></i>
                    新建问卷
                </RouterLink>
            </div>
        </div>
    </div>

    <div class="ui placeholder segment" v-if="surveys && !surveys.length">
        <div class="ui icon header">
            <i class="file outline icon"></i>
            您还没有创建任何问卷
        </div>
        <RouterLink class="ui labeled icon primary button" to="/create">
            新建问卷
            <i class="plus icon"></i>
        </RouterLink>
    </div>

    <table class="ui unstackable center aligned table" v-else>
        <thead>
            <tr>
                <th class="two wide">标题</th>
                <th class="left aligned">描述</th>
                <th class="two wide">种类</th>
                <th class="two wide">操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="survey in surveys" :key="survey.objectId" v-if="surveys">
                <td>{{ survey.attributes.title }}</td>
                <td class="left aligned description">{{ survey.attributes.description }}</td>
                <td>{{ { simple: '普通', exam: '测验' }[survey.attributes.type] + '问卷' }}</td>
                <td>
                    <a @click="deleteSurvey(survey.id)">删除</a>
                </td>
            </tr>

            <tr v-for="i in 5" :key="i" v-else>
                <td>
                    <div class="ui placeholder">
                        <div class="header">
                            <div class="line"></div>
                            <div class="line"></div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="ui placeholder">
                        <div class="header">
                            <div class="line"></div>
                            <div class="line"></div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="ui placeholder">
                        <div class="header">
                            <div class="line"></div>
                            <div class="line"></div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="ui placeholder">
                        <div class="header">
                            <div class="line"></div>
                            <div class="line"></div>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="ui mini basic modal" id="delete-modal">
        <div class="ui icon header">
            <i class="trash icon"></i>
            删除问卷
        </div>
        <div class="content">
            <p>确定要删除该问卷吗？此操作不可撤销。</p>
        </div>
        <div class="actions">
            <div class="ui red basic cancel inverted button">
                <i class="remove icon"></i>
                否
            </div>
            <div class="ui green ok inverted button">
                <i class="checkmark icon"></i>
                是
            </div>
        </div>
    </div>
</template>

<style scoped>
.description {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 0;
}

a {
    cursor: pointer;
}
</style>

<script>
import UserActionHeader from '../components/UserActionHeader.vue';

export default {
    name: 'Dashboard',
    components: {
        UserActionHeader
    },
    data() {
        return {
            user: AV.User.current(),
            surveys: null
        };
    },
    mounted() {
        const query = new AV.Query('survey');
        query.equalTo('creater', AV.User.current());
        query.find().then((surveys) => {
            this.surveys = surveys;
            console.log(surveys);
        });
    },
    methods: {
        deleteSurvey(survey) {
            console.log(survey);
            $('#delete-modal')
                .modal({
                    onApprove: () => {
                        $('#delete-modal').addClass(['loading', 'disabled']);
                        const query = new AV.Query('survey');
                        query.get(survey).then(
                            (survey) => {
                                survey.destroy().then(() => {
                                    this.$router.go(0);
                                });
                            },
                            () => {
                                $('#delete-modal').removeClass(['loading', 'disabled']);
                            }
                        );
                    }
                })
                .modal('show');
        }
    }
};
</script>
