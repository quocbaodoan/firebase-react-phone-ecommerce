
const validateInfo = (email, password, rePassword) => {
    let errors = {};

    if (rePassword !== undefined) {
        //Email
        if (!email) {
            errors.email = "Bạn chưa nhập email!";
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            errors.email = "Email của bạn không chính xác!";
        }

        //Password
        if (!password) {
            errors.password = "Bạn chưa nhập mật khẩu!";
        }
        else if (password.length < 6) {
            errors.password = "Độ dài mật khẩu từ 6 ký tự trở lên!";
        }

        //Re-password
        if (!rePassword) {
            errors.rePassword = "Bạn chưa nhập lại mật khẩu!";
        }
        else if (rePassword !== password) {
            errors.rePassword = "Mật khẩu không trùng khớp!";
        }
    }
    else if (password !== undefined) {
        //Email
        if (!email) {
            errors.email = "Bạn chưa nhập email!";
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            errors.email = "Email của bạn không chính xác!";
        }

        //Password
        if (!password) {
            errors.password = "Bạn chưa nhập mật khẩu!";
        }
    }
    else {
        //Email
        if (!email) {
            errors.email = "Bạn chưa nhập email!";
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            errors.email = "Email của bạn không chính xác!";
        }
    }
    return errors;
}

export default validateInfo;
