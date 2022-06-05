document.querySelector('.send-messge-button').onclick = (event) => {
    const form = document.forms.sendMessge;
    event.preventDefault();
    const jData = new FormData(form);
    const data = {};
    jData.forEach((value, key) => (data[key] = value));
    console.log(data);

    fetch('/article/fetch/post/user', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
});
}