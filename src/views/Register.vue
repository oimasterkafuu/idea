<template>
    <div class="ui middle aligned center aligned grid">
        <div class="column">
            <UserActionHeader title="注册" subtitle="让我们从这里开始" />
            <div class="ui segment">
                <div class="ui large form" id="register-form">
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input type="text" name="username" placeholder="输入用户名" />
                        </div>
                    </div>
                    <div class="two fields">
                        <div class="field">
                            <div class="ui left icon input">
                                <i class="lock icon"></i>
                                <input type="password" name="password" placeholder="输入密码" />
                            </div>
                        </div>
                        <div class="field">
                            <div class="ui left icon input">
                                <i class="lock icon"></i>
                                <input type="password" name="repeat-password" placeholder="确认密码" />
                            </div>
                        </div>
                    </div>
                    <div class="ui error message"></div>
                    <div class="field">
                        <button class="ui fluid large positive icon button" id="register-button" @click="submit()">
                            通往新世界的大门
                            <i class="right arrow icon"></i>
                        </button>
                    </div>
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
    max-width: 450px;
}
</style>

<script>
import UserActionHeader from '../components/UserActionHeader.vue';
export default {
    name: 'Register',
    components: {
        UserActionHeader
    },
    mounted() {
        if (AV.User.current()) {
            this.$router.go(-1);
        }

        $('[name="password"]').popup({
            on: 'focus',
            position: 'left center',
            html: '<h3>我的密码安全吗？</h3><p>很安全。Idea 会自动对你的密码进行<strong>不可逆加密</strong>。即使是 Idea 的开发者也无法获取。</p>'
        });

        $('#register-button').on('mouseenter', function () {
            $('.right.arrow.icon').transition('tada').transition('clear queue');
        });

        $('#register-form').form({
            fields: {
                username: {
                    identifier: 'username',
                    rules: [
                        {
                            type: 'minLength[5]',
                            prompt: '用户名至少需要 5 个字符'
                        },
                        {
                            type: 'maxLength[20]',
                            prompt: '用户名最多 20 个字符'
                        },
                        {
                            type: 'regExp[/^[a-zA-Z0-9_]+$/]',
                            prompt: '用户名只能包含字母、数字和下划线'
                        }
                    ]
                },
                password: {
                    identifier: 'password',
                    rules: [
                        {
                            type: 'minLength[6]',
                            prompt: '密码至少需要 6 个字符'
                        },
                        {
                            type: 'maxLength[20]',
                            prompt: '密码最多 20 个字符'
                        },
                        {
                            type: 'doesntContain[password]',
                            prompt: '密码过于简单'
                        },
                        {
                            type: 'doesntContain[123456]',
                            prompt: '密码过于简单'
                        }
                    ]
                },
                'repeat-password': {
                    identifier: 'repeat-password',
                    rules: [
                        {
                            type: 'match[password]',
                            prompt: '两次输入的密码不一致'
                        }
                    ]
                }
            },
            onSuccess: () => {
                $('#register-button').addClass(['loading', 'disabled']);
                const user = new AV.User();
                user.setUsername($('#register-form input[name="username"]').val());
                user.setPassword($('#register-form input[name="password"]').val());

                user.signUp().then(
                    async (user) => {
                        const key = await window.crypto.subtle.generateKey(
                            {
                                name: 'RSA-OAEP',
                                modulusLength: 2048,
                                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                                hash: 'SHA-256'
                            },
                            true,
                            ['encrypt', 'decrypt']
                        );

                        const exportedPrivateKey = await window.crypto.subtle.exportKey('jwk', key.privateKey);
                        const exportedPublicKey = await window.crypto.subtle.exportKey('jwk', key.publicKey);

                        const exportedKey = {
                            privateKey: exportedPrivateKey,
                            publicKey: exportedPublicKey
                        };

                        user.set('rsaKey', exportedKey);
                        await user.save();
                        location.reload();
                    },
                    (error) => {
                        switch (error.code) {
                            case 202:
                                $('#register-form').form('add errors', ['用户名已被占用']);
                                $('#register-form input[name="username"]').closest('.field').addClass('error');
                                break;
                        }
                        $('#register-button').removeClass(['loading', 'disabled']);
                    }
                );
            },
            onFailure: () => {
                $('#register-button').removeClass(['loading', 'disabled']);
                $('.ui.error.message').transition('pulse').transition('clear queue');
            }
        });
    },
    methods: {
        submit() {
            $('#register-form').form('validate form');
        }
    }
};
</script>
