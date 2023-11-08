// let exportpdf = await axios.post(`${process.env.REACT_APP_URL}/actions/exportpdf`,bodyObj,{headers:{ "Content-Type": "application/pdf","token-pdfeditor":`Bearer ${localStorage.getItem('token')}`}})

// let pdf = await axios.get(`${process.env.REACT_APP_URL}/actions/getpdf`,{headers:{"token-pdfeditor":`Bearer ${localStorage.getItem('token')}`,"Content-Type":"application/pdf"},  responseType: 'arraybuffer' })



//     let response = axios.post(`${process.env.REACT_APP_URL}/user/signup`,{
//         "name": fname,
//        "email": email,
//        "password": password,
//        "repeatpassword": confirmpassword,
//    })