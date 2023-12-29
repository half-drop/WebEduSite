document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('input[type="button"]').addEventListener('click', function() {
        var category = document.getElementById('category').value;
        var writer = document.getElementById('writer').value.trim();
        var content = document.getElementById('content').value.trim();
        var submitMessage = document.getElementById('submitMessage');

        // 验证是否选择了栏目
        if (category === 'default') {
            submitMessage.innerText = '请选择投稿栏目';
            submitMessage.style.color = 'red';
            return;
        }

        // 验证作者是否为空
        if (writer === '') {
            submitMessage.innerText = '请填写作者名称';
            submitMessage.style.color = 'red';
            return;
        }

        // 验证内容是否为空
        if (content === '') {
            submitMessage.innerText = '请填写投稿内容';
            submitMessage.style.color = 'red';
            return;
        }

        // 所有验证通过
        submitMessage.innerText = '提交成功';
        submitMessage.style.color = 'green';
    });
});