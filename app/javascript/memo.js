const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
// XHR.response.postと記述することで、レスポンスの中から投稿されたメモの情報を抽出し、変数itemに格納しています。
// XHR.response.postで値が取れるのは、postsコントローラーのcreateアクションにrender json: {post: post}と記述されていることで、postというキーと投稿されたメモの内容が紐付いているからです。

  return html;
};


function post(){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);
// FormDataとは、フォームに入力された値を取得できるオブジェクトのことです。
// new FormData(フォームの要素);のように記述することでオブジェクトを生成し、引数にフォームの要素を渡すことで、そのフォームに入力された値を取得できます。
// 今回は、メモ投稿のフォームに入力された値を、非同期通信で送信する必要があるためフォームの値を取得します。
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
// open()メソッドとは、リクエストを初期化するメソッドです。リクエストの内容を指定するためのメソッドだと理解しておいてください。
// XMLHttpRequestオブジェクトのメソッドの一種です。openメソッドを用いるときは、XHR.open("POST", "/posts", true);のように表記します。
// 第一引数にはHTTPメソッド、第二引数にはパス、第三引数には非同期通信であるかをtrueかfalseで記述します。
    XHR.responseType = "json";
// responseTypeプロパティとは、レスポンスのデータフォーマット（＝どのような形式のデータにするか）を指定するプロパティです。
// リクエストを送信する際に、レスポンスで欲しいデータフォーマットをあらかじめ指定しておく必要があります。
// 今回は、レスポンスのデータを「JSON形式」で返して欲しいため、データフォーマットを「JSON」に指定します。
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
// insertAdjacentHTMLメソッドとは、HTMLをある要素の指定した箇所に挿入するメソッドです。
// HTMLを挿入したい要素に対して使うメソッドで、第一引数にHTMLを挿入したい位置、第二引数に挿入したいHTMLを記述します。
      formText.value = "";
    };
// onloadプロパティとは、リクエストの送信が成功したときに呼び出されるプロパティのことです。
// XMLHttpRequestオブジェクトのプロパティの一種です。
// onloadプロパティで、リクエストの送信に成功したときに行う処理を定義します。
  });
};

window.addEventListener('load', post);