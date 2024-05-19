let form = document.getElementById("send_mail_form");
let form_2 = document.getElementById("send_mail_form_footer");
let btnSubmit = form.querySelector("[type=submit]");
const nganhIndex = 0;

const sendData = async (name, email, sdt, address) => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json, text/plain, */*");

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("sdt", sdt);
    formdata.append("major", nganhIndex);
    formdata.append("address", address);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
    };
    btnSubmit.innerHTML = "Đang gửi...";
    btnSubmit.disabled = true;
    fetch("https://xettuyen.fft.vn/api/landing_page/send-mail", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            if (result == "1") {
                alert("Gửi thành công");
                form.reset();
            } else {
                alert("Lỗi, thử lại sau \n" + result.message + "\n" + errors);
            }
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = "Gửi ngay";
        })
        .catch((error) => {
            alert("Lỗi, thử lại sau");
            btnSubmit.innerHTML = "Gửi ngay";
            btnSubmit.disabled = false;
            console.log(error);
        });
};
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = new FormData(form);
    sendData(
        formData.get("name"),
        formData.get("email"),
        formData.get("sdt"),
        formData.get("address")
    );
});

// Nếu có 2 form thì dùng cái này
form_2.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = new FormData(form_2);
    sendData(
        formData.get("name"),
        formData.get("email"),
        formData.get("sdt"),
        formData.get("address")
    );
});


