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
  });
};

window.addEventListener('load', post);