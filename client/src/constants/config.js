
export const API_NOTIFICATION_MESSEGE={
    loading:{
        title: 'Loading...',
        messege:'Data is being loaded, Please wait'
    },
    success:{
        title:'Success',
        messege:'Data successfully loaded'
    },
    reponseFailure:{
        title: 'Error',
        messege:'An error occured while fetching the response from the server'
    },
    requestFailure:{
        title:'Error',
        messege:'An error occured while parsing the data'
    },
    networkError:{
        title:'Error',
        messege:'Unable to connect with the server. Please try again..'
    }
}

// API SERVICE URL
// Sample request
//Need SERVICE CALL :{url:'/',method: [post or get, put,delete],params:true ot false}

export const SERVICE_URL={
    userSignup:{ url: "/signup",method: 'POST'},
    userLogin:{url:"/login",method:'POST'},
    uploadFile:{url:"/file/upload", method:'POST'},
    createPost:{url:"create",method:'POST'},
    getAllPosts:{url: "/posts",method:'GET',params :true},
    getPostById:{url: "post",method:'GET',query:true},
    updatePost:{url:"/update",method:'PUT',query:true},
    deletePost: { url: '/delete', method: 'DELETE', query: true },
}