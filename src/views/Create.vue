<template>
    <div class="ui middle aligned center aligned grid">
        <div class="column">
            <UserActionHeader title="创建问卷" subtitle="定制您的问卷内容" />
            <div class="ui segment">
                <div class="ui large form" id="survey-form">
                    <div class="field">
                        <div class="ui input">
                            <input type="text" name="title" placeholder="问卷标题" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui input">
                            <textarea name="description" placeholder="问卷描述"></textarea>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui selection dropdown">
                            <input type="hidden" name="type" />
                            <div class="default text">问卷类型</div>
                            <i class="dropdown icon"></i>
                            <div class="menu">
                                <div class="item" data-value="simple">普通问卷</div>
                                <div class="item" data-value="exam">测验问卷</div>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <button class="ui fluid large positive icon button" id="submit-button" @click="submit()">
                            确认没问题
                            <i class="checkmark icon"></i>
                        </button>
                    </div>
                    <div class="ui error message"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.grid {
    height: var(--body-full-height);
}

.column {
    max-width: 650px;
}
</style>

<script>
import UserActionHeader from '../components/UserActionHeader.vue';

export default {
    name: 'Create',
    components: {
        UserActionHeader
    },
    methods: {
        submit() {
            $('#survey-form').form('validate form');
        }
    },
    mounted() {
        if (!AV.User.current()) {
            this.$router.go(-1);
        }

        $('#survey-form .dropdown').dropdown();
        $('#survey-form').form({
            fields: {
                title: {
                    identifier: 'title',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '请输入问卷标题'
                        },
                        {
                            type: 'maxLength[20]',
                            prompt: '标题长度不能超过 20 个字'
                        }
                    ]
                },
                type: {
                    identifier: 'type',
                    rules: [
                        {
                            type: 'empty',
                            prompt: '请选择问卷类型'
                        },
                        {
                            type: 'regExp[/^(|simple|exam)$/]',
                            prompt: '请选择正确的问卷类型'
                        }
                    ]
                }
            },
            onSuccess: () => {
                $('#submit-button').addClass(['loading', 'disabled']);

                const title = $('#survey-form input[name="title"]').val();
                const description = $('#survey-form textarea[name="description"]').val();
                const type = $('#survey-form input[name="type"]').val();

                const survey = new AV.Object('survey');
                survey.set('title', title);
                survey.set('description', description);
                survey.set('type', type);
                survey.set('creater', AV.User.current());
                survey.set('content', []);
                survey.set('encrypt', AV.User.current().get('rsaKey').publicKey);

                survey.save().then(
                    () => {
                        this.$router.push({
                            name: 'edit',
                            params: {
                                id: survey.id
                            }
                        });
                    },
                    (error) => {
                        $('#submit-button').removeClass(['loading', 'disabled']);
                    }
                );
            },
            onFailure: () => {
                $('#register-button').removeClass(['loading', 'disabled']);
                $('.ui.error.message').transition('pulse').transition('clear queue');
            }
        });
    }
};
</script>
